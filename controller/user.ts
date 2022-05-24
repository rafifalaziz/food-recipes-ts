import {user} from '../model';
import {Request, Response} from 'express';

class User {
  async register(req: Request, res: Response) {
    try {
      const {username, password} = req.body;
      const USER = new user({
        username: username,
        password: password,
      });
      await USER.save().then(user => {
        res.status(200).send({
          user,
        });
      });
    } catch (error) {
      res.status(500).send({
        error,
      });
      console.log(error);
    }
  }
}

export default new User();
