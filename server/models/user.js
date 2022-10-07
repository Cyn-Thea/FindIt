var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcryptjs = require('bcryptjs');
var Collection = require('./collection')

var userSchema = new Schema({
    username: { 
        type: String},
    firstName: {
         type: String },
    lastName: { 
        type: String},
    email:  {type: String, 
        lowercase: true, unique: true, 
        match:  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ , index: true},
    password: {
         type: String},
    collections: [{ 
        type: Schema.Types.ObjectId,
        ref: 'collections'}],
    posts: [{ 
        type: Schema.Types.ObjectId,
        ref: 'users'}]
  });

module.exports = mongoose.model('users', userSchema)
