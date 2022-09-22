var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema({
    
    name: {type: String, required: true},
    street: { type: String },
    zipcode: { type: String },
    city: { type: String },
    //_id: { type: Number },
    score: {type: Number}
});

module.exports = mongoose.model('places', placeSchema);
