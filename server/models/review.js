var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// review Schema

var reviewSchema = new Schema({
    author: {
        id: {
           type: mongoose.Schema.Types.ObjectId,
        ref: "users",
        required: true
        }
        },
    rating:  {
            type: String, 
            required: false
        },
    comment: { 
        type: String,
        required: false
        },
     place_data: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'places'
          }
    
});

module.exports = mongoose.model('reviews', reviewSchema);