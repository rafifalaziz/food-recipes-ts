import {Request, Response} from 'express';
import mongoose from 'mongoose';
import {food, user as USER} from '../model';

class Food {
  async addFood(req: Request, res: Response) {
    try {
      const {name, description, calories} = req.body;
      const user = await USER.findById(res.locals.user);
      console.log(user);
      const FOOD = new food({
        name: name,
        description: description,
        calories: calories,
        user_id: user!._id,
      });
      await USER.findByIdAndUpdate(user!._id, {$push: {foods: FOOD}});
      await FOOD.save().then(() => {
        res.status(200).send({
          success: true,
          message: 'Menambahkan makanan berhasil',
          code: 200,
        });
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Menambahkan makanan gagal',
        code: 500,
        error,
      });
    }
  }

  async editFood(req: Request, res: Response) {
    try {
      const id = new mongoose.mongo.ObjectId(req.params.id);
      await food.findByIdAndUpdate(id, {
        ...req.body,
      });
      res.status(200).send({
        success: true,
        message: 'Mengedit makanan berhasil',
        code: 200,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Mengedit makanan gagal',
        code: 500,
        error,
      });
    }
  }

  async deleteFood(req: Request, res: Response) {
    try {
      const id = new mongoose.mongo.ObjectId(req.params.id);
      await food.deleteOne({_id: id});
      await USER.updateOne(
        {_id: res.locals.user},
        {
          $pullAll: {foods: [id]},
        }
      );
      res.status(200).send({
        success: true,
        message: 'Menhapus makanan berhasil',
        code: 200,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: 'Menghapus makanan gagal',
        code: 500,
        error,
      });
    }
  }
}

export default new Food();
