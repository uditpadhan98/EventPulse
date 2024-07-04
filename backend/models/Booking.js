const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
  event: {type:mongoose.Schema.Types.ObjectId, required:true, ref:'Event'},
  user: {type:mongoose.Schema.Types.ObjectId, required:true},
  name: {type:String, required:true},
  phone: {type:String, required:true},
});

const BookingModel = mongoose.model('Booking', bookingSchema);

module.exports = BookingModel;