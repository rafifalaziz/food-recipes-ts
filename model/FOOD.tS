import { ObjectId } from 'mongodb';
import {Schema, model, Types, SchemaTypes} from 'mongoose';

interface IFood {
  name: string;
  description: string;
  calories: string;
  user_id: Types.ObjectId;
}

const foodSchema = new Schema<IFood>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  calories: {
    type: String,
    required: true,
  },
  user_id: 
    {
      type: SchemaTypes.ObjectId,
      required: true,
    },
});

const Food = model<IFood>('Food', foodSchema);

export default Food;
