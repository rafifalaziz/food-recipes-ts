import express from 'express';
import {food} from '../controller';
import {verifyToken} from '../middleware';
const routes = express.Router();

routes.post('/add', verifyToken, food.addFood);
routes.put('/edit/:id', verifyToken, food.editFood);
routes.delete('/delete/:id', verifyToken, food.deleteFood);

export default routes;
