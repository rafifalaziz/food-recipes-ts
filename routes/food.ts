import express from 'express';
import {food} from '../controller';
import {verifyToken, imageUpload} from '../middleware';

const routes = express.Router();

routes.post('/add', verifyToken, imageUpload, food.addFood);
routes.put('/edit/:id', verifyToken, imageUpload, food.editFood);
routes.delete('/delete/:id', verifyToken, food.deleteFood);
routes.get('/get/:id', verifyToken, food.getFood);
routes.get('/list/:limit&:page', verifyToken, food.listFood);

export default routes;
