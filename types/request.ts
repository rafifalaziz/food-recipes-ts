import {Request} from 'express';

type userType = {
  username: string;
};

interface CustomRequest extends Request {
  user: userType;
}

export {userType, CustomRequest};
