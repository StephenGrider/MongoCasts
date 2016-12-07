const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PointSchema = new Schema({
  coordinates: { type: [Number], index: '2dsphere' },
  type: { type: String, default: 'Point' }
});

const DriverSchema = new Schema({
  email: {
    type: String,
    required: true
  },
  driving: {
    type: Boolean,
    default: false
  },
  geometry: PointSchema
});

const Driver = mongoose.model('driver', DriverSchema);

module.exports = Driver;
