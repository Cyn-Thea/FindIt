var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dogSchema = new Schema({
    //owner: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    owner: { type: String },
    photo: { type: String },
    breed: { type: String },
    name: { type: String },
    age: { type: Number }
});

module.exports = mongoose.model('dogs', dogSchema);