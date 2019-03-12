import { Schema, model as Model } from 'mongoose';
import { garbageString } from '../utils/garbage';

const question: Schema = new Schema({
  number: {
    type: Schema.Types.Number,
    required: true,
  },
  content: {
    type: Object,
    required: true,
  },
  category: {
    type: Schema.Types.String,
    required: true,
  },
  solution: {
    type: Schema.Types.Mixed,
    required: true,
  },
  score: {
    type: Schema.Types.Number,
    required: true,
  },
  attempts: {
    type: Schema.Types.Array,
    default: garbageString(),
  },
  successfulAttempt: {
    type: Object,
    default: {},
  },
});

export default Model('question', question);
