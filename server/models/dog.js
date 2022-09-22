var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var dogSchema = new Schema({
    //owner: {type: mongoose.Schema.Types.ObjectId, ref: 'users'},
    //owner: { type: String },
    //dogID: { type: String },
    //_id: { type: String },

    owner: { type: Schema.Types.ObjectId, ref: "users" },
    photo: { type: String },
    breed: { type: String },
    dogName: { type: String },
    age: { type: Number }
});
module.exports = mongoose.model('dogs', dogSchema);
