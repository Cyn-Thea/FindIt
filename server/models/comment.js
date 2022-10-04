var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var commentSchema = new Schema({
    author: {
         type: Schema.Types.ObjectId, 
         ref: "users" },
    comment: { 
        type: String,
        required: false},
    post_data: { 
        type: Schema.Types.ObjectId, 
        ref: "posts" }
});

module.exports = mongoose.model('comments', commentSchema);
