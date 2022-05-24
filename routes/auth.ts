import express from 'express';
import {user} from '../controller';
const routes = express.Router();

routes.post('/register', user.register);

export default routes;
