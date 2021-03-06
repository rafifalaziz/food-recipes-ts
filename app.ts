import express from 'express';
import {connect} from 'mongoose';
import routes from './routes';
import 'dotenv/config';

connect('mongodb://localhost:27017/food-recipe');

const app = express();

app.use('/upload', express.static('upload'));
app.use(express.json());
app.use('/', routes);

app.listen(3000, () => {
  console.log('tes');
});
