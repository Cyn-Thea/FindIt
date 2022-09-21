var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
    _id: {type: String},
    //_id: mongoose.Schema.Types.ObjectId,
    username: {type: String},
    email:  {type: String},
            //lowercase: true, 
            //unique: true,
            //required: true,
            //required: [true, 'can\'t be blank'],
            //match:  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ ,
            //index: true},

    password: {type: String},
            //required:true}
          
    //bucketList: [{ type: mongoose.Schema.Types.ObjectId,ref: 'places'}]
    bucketList: [{type: Schema.Types.ObjectId, ref: 'places'}]
});

module.exports = mongoose.model('users', userSchema);