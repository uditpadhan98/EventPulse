const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
  hour: { type: Number, required: true, min: 0, max: 23 },
  minute: { type: Number, required: true, min: 0, max: 59 }
});

const eventSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  title: String,
  address: String,
  photos: [String],
  description: String,
  startDate: {type:Date, required:true},
  time: { type: timeSchema, required: true },
});

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;