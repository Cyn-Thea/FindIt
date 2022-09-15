var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// user Schema

var userSchema = new Schema({
    username: {
         type: String,
         required:true
         },
   email:  {
            type: String, 
            lowercase: true, unique: true,
             required: [true, 'can\'t be blank'],
             match:  /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/ ,
              index: true
        },
    password: { 
        type: String,
        required:true
     },
     bucketList: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'places'
      }
    ]
});

module.exports = mongoose.model('users', userSchema);