import express from 'express';
import {user} from '../controller';
const routes = express.Router();

routes.post('/register', user.register);
routes.post('/login', user.login);

export default routes;
