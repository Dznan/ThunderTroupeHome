const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  name: String,
  work: String,
  email: String,
  phone: String,
  create: Number
})
module.exports =  UserSchema