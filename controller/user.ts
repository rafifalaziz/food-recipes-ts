import {user} from '../model';
import {Request, Response} from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const saltRounds = 10;

class User {
  async register(req: Request, res: Response) {
    try {
      const {username, password} = req.body;
      if ((await user.find({username: username}))[0]) {
        res.status(409).send({
          success: false,
          message: 'Register gagal, karena username sudah ada',
          code: 409,
        });
        return;
      }
      const hashedPassword = await bcrypt.hash(password, saltRounds);
      const USER = new user({
        username: username,
        password: hashedPassword,
      });
      await USER.save().then(() => {
        res.status(200).send({
          success: true,
          message: 'Register berhasil',
          code: 200,
        });
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Register gagal',
        code: 500,
        error,
      });
    }
  }

  async login(req: Request, res: Response) {
    try {
      const USER = await user.find({username: req.body.username});
      if (!USER[0]) {
        res.status(403).send({
          success: false,
          message: 'User tidak ditemukan',
          code: 403,
        });
        return;
      }
      const password = req.body.password;
      const comparisonPassword = await bcrypt.compare(
        password,
        USER[0].password
      );
      if (comparisonPassword) {
        const token = jwt.sign(
          {_id: USER[0]._id},
          process.env.secret as string,
          {
            expiresIn: 86400 * 356, // 1 year
          }
        );
        res.status(200).send({
          success: true,
          message: 'login berhasil',
          code: 200,
          token,
        });
      } else {
        res.status(403).send({
          success: false,
          message: 'Password salah',
          code: 403,
        });
        return;
      }
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'login gagal',
        code: 500,
        error,
      });
    }
  }
}

export default new User();
