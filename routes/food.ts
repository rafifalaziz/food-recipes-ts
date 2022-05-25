import express from 'express';
import {food} from '../controller';
import {verifyToken} from '../middleware';
const routes = express.Router();

routes.post('/add', verifyToken, food.addFood);

export default routes;
