var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var postSchema = new Schema({
    catergory: {
        type: String},
    title: { 
        type: String },
    description: {
         type: String },
    author: {
             type: Schema.Types.ObjectId,
              ref: "users" },
    building: {
        type: String },
    room: {
        type: String },
    additionalInformation: { 
        type: String },
    comments: [{ 
        type: Schema.Types.ObjectId, 
        ref: 'comments' }],
    date: {
        type: Date}
});


module.exports = mongoose.model('posts', postSchema);
