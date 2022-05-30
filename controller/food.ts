import {Request, Response} from 'express';
import mongoose from 'mongoose';
import {food, user as USER} from '../model';

class Food {
  async addFood(req: Request, res: Response) {
    try {
      const {name, description, calories} = req.body;
      const user = await USER.findById(res.locals.user);
      const FOOD = new food({
        name: name,
        description: description,
        calories: calories,
        image: req.file
          ? req.get('host') + '/upload/' + req.file.filename
          : null,
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
        image: req.get('host') + '/upload/' + req.file?.filename,
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

  async getFood(req: Request, res: Response) {
    try {
      const id = new mongoose.mongo.ObjectId(req.params.id);
      const FOOD = await food.findById(id);
      res.status(200).send({
        success: true,
        message: 'Mendapatkan makanan berhasil',
        code: 200,
        FOOD,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Mendapatkan makanan gagal',
        code: 500,
        error,
      });
    }
  }

  async listFood(req: Request, res: Response) {
    try {
      const limit = parseInt(req.params.limit);
      const page = parseInt(req.params.page);
      const offset = (page - 1) * limit;
      const foods = await food.find({}).skip(offset).limit(limit);
      res.status(200).send({
        success: true,
        message: 'Mendapatkan list makanan berhasil',
        code: 200,
        foods,
        currentPage: page,
        limit: limit,
      });
    } catch (error) {
      res.status(500).send({
        success: false,
        message: 'Mendapatkan list makanan gagal',
        code: 500,
        error,
      });
    }
  }
}

export default new Food();
