import express from 'express';
import {connect} from 'mongoose';
import routes from './routes';

connect('mongodb://localhost:27017/food-recipe');

const app = express();

app.use(express.json());
app.use('/', routes);

app.listen(3000, () => {
  console.log('tes');
});
