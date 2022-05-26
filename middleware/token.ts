import jwt from 'jsonwebtoken';
import {Response, NextFunction, Request} from 'express';

function verifyToken(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization;
  if (!token) {
    return res.status(403).send({
      message: 'No token provided!',
    });
  }

  jwt.verify(
    token.split(' ')[1],
    process.env.secret as string,
    (err, decoded) => {
      if (err) {
        console.log(err);
        return res.status(401).send({
          message: 'Unauthorized!',
        });
      }
      res.locals.user = decoded;
      next();
    }
  );
}

export {verifyToken};
