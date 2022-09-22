var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var reviewSchema = new Schema({

    //author: {id: {type: mongoose.Schema.Types.ObjectId,ref: "users",required: true}},
    //author: {type: String},
    //_id: {type: String},
    //place_data: {type: mongoose.Schema.Types.ObjectId,ref: 'places'}
    //place_data:[{type: Schema.Types.ObjectId, ref: 'places'}]
    //place_data: {type: String}

    author: { type: Schema.Types.ObjectId, ref: "users" },
    rating:  {type: Number, required: false},
    comment: { type: String,required: false},
    place_data: { type: Schema.Types.ObjectId, ref: "places" }
});

module.exports = mongoose.model('reviews', reviewSchema);
