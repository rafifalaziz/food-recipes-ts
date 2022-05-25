import {Schema, model} from 'mongoose';

interface IUser {
  username: string;
  password: string;
  foods: Array<Object>;
}

const userSchema = new Schema<IUser>({
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  foods: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Food',
    },
  ],
});

const User = model<IUser>('User', userSchema);

export default User;
