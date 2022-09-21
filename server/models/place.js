var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema({
    
    name: {type: String, required: true},
    street: { type: String },
    zipcode: { type: String },
    city: { type: String },
    placeID: { type: Number },
    score: {type: String, }
});

module.exports = mongoose.model('places', placeSchema);
