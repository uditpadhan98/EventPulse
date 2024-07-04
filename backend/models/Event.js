const mongoose = require('mongoose');

const timeSchema = new mongoose.Schema({
  hour: { type: Number, required: true, min: 0, max: 23 },
  minute: { type: Number, required: true, min: 0, max: 59 }
});

const eventSchema = new mongoose.Schema({
  owner: {type:mongoose.Schema.Types.ObjectId, ref:'User'},
  organiser: {type:String, ref:'User'},
  title: { type: String, required: true },
  address: { type: String, required: true },
  photos: { type: [String], required: true },
  description: { type: String, required: true },
  startDate: {type:Date, required:true},
  time: { type: timeSchema, required: true },
});

const EventModel = mongoose.model('Event', eventSchema);

module.exports = EventModel;