import {Request} from 'express';

type userObject = {
  username: string;
  password: string;
  foods: Array<object>;
};

interface CustomRequest extends Request {
  user?: Object;
}

export {userObject, CustomRequest};
