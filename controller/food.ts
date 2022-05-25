import {Response} from 'express';
import {food} from '../model';
import {CustomRequest} from '../types';

class Food {
  async addFood(req: CustomRequest, res: Response) {
    try {
      const {name, description, calories} = req.body;
      //   const userValue = req.user;
      const FOOD = new food({
        name: name,
        description: description,
        calories: calories,
        // user: userValue,
      });
      //   await USER.updateOne({username: FOOD.user.username});
      await FOOD.save().then(() => {
        res.status(200).send({
          success: true,
          message: 'Menambahkan makanan berhasil',
          code: 200,
        });
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Food();
