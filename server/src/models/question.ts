import { Schema, model as Model } from 'mongoose';
import { garbageString } from '../utils/garbage';

const question: Schema = new Schema({
  id: {
    type: Schema.Types.Number,
    required: true,
  },
  content: {
    type: Schema.Types.Embedded,
    required: true,
  },
  category: {
    type: Schema.Types.String,
    required: true,
  },
  attempts: {
    type: Schema.Types.Array,
    default: garbageString(),
  },
  successfulAttempt: {
    type: Schema.Types.Embedded,
    default: {},
  },
});

export default Model('question', question);
