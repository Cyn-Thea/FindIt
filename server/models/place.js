var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var placeSchema = new Schema({
    adress: { type: String },
    name: { type: String },
    placeID: { type: Number },
    score: { type: Number }
});

module.exports = mongoose.model('places', placeSchema);
