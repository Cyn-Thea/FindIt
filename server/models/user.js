var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    username: { type: String, },
    email:  {type: String, lowercase: true, unique: true, required: [true, 'can\'t be blank'],match:  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ , index: true},
    password: { type: String, },
    bucketList: [{ type: Schema.Types.ObjectId, ref: 'places'}],
    dogList: [{ type: Schema.Types.ObjectId, ref: 'dogs'}]
});

module.exports = mongoose.model('users', userSchema);
