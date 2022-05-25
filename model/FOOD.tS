import {Schema, model} from 'mongoose';

interface IFood {
  name: string;
  description: string;
  calories: string;
//   user: object;
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
//   user: 
//     {
//       type: Schema.Types.ObjectId,
//       ref: 'User',
//     },
});

const Food = model<IFood>('Food', foodSchema);

export default Food;
