const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const dishSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  createdAt: { type: Date, required: true, default: Date.now },
  start: { type: Date },
  end: { type: Date },
  ready: { type: Date },
  by: { type: Schema.Types.ObjectId, ref: 'user' }
});

const modelClass = mongoose.model('dish', dishSchema);

module.exports = modelClass;
