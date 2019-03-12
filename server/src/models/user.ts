import { Schema, model as Model } from 'mongoose';

const user: Schema = new Schema({
  username: {
    type: Schema.Types.String,
    required: true,
  },
  name: {
    type: Schema.Types.String,
    required: true,
  },
  score: {
    type: Schema.Types.Number,
    default: 0,
  },
});

export default Model('user', user);
