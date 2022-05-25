import express from 'express';
import auth from './auth';
import food from './food';

const routes = express.Router();

routes.use('/auth', auth);
routes.use('/food', food);

export default routes;
