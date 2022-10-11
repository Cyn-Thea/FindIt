var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcryptjs = require('bcryptjs');

var userSchema = new Schema({
    username: { 
        type: String},
    firstName: {
         type: String },
    lastName: { 
        type: String},
    email:  {type: String, 
        lowercase: true,
        match:  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/},
    password: {
         type: String},
    collections: [{ 
        type: Schema.Types.ObjectId,
        ref: 'collections'}],
    posts: [{ 
        type: Schema.Types.ObjectId,
        ref: 'posts'}]
  });

module.exports = mongoose.model('users', userSchema)
