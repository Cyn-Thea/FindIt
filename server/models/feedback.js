var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// feedback Schema

var feedbackSchema = new Schema({
    rating:  {
            type: String, 
            required: false
        },
    comment: { 
        type: String,
        required: false
        },
    author: {
            id: {
               type: mongoose.Schema.Types.ObjectId,
            ref: "Users",
            required: true
            }
            }
});

module.exports = mongoose.model('Feedback', feedbackSchema);