const mongoose = require('mongoose');
const {Schema} = mongoose;

const UserSchema = new mongoose.Schema({
  name: {type:String, required:true},
  email: {type:String, unique:true},
  club: {type:String, required:true},
  password: {type:String, required:true},
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;