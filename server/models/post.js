var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    category: {
        type: String},
    title: { 
        type: String },
    description: {
         type: String },
    author: {
             type: Schema.Types.ObjectId,
              ref: "users" },
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'comments' }],
    date: {
        type: Date,
        default: Date.now}
});


module.exports = mongoose.model('posts', postSchema);
