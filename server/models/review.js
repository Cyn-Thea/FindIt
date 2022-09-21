var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({

    //author: {id: {type: mongoose.Schema.Types.ObjectId,ref: "users",required: true}},
    //author: { type: Schema.Types.ObjectId, ref: "users" },
    author: {type: String},
    rating:  {type: String, required: false},
    comment: { type: String,required: false},
    //place_data: {type: mongoose.Schema.Types.ObjectId,ref: 'places'}
    //place_data:[{type: Schema.Types.ObjectId, ref: 'places'}]
    place_data: {type: String}
});

module.exports = mongoose.model('reviews', reviewSchema);