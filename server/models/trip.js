var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var tripSchema = new Schema({
    tripID: { type: String },
    price: { type: Number },
    routeStart: { type: String },
    routeEnd: { type: String },

    places: [{ type: Schema.Types.ObjectId, ref: "places" }],
});

module.exports = mongoose.model('trips', tripSchema);