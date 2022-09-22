var express = require('express');
var router = express.Router();
var Dog = require('../models/dog');
var Owner = require('../models/user');
 
//Creates a new dog
router.post('/api/dogs', function(req, res, next){
   var dog = new Dog(req.body);
   dog.save(function(err, dog) {
       if (err) { return next(err); }
       res.status(201).json(dog);
   })
});
 
// Return a list of all dogs
router.get('/api/dogs', function(req, res, next) {
   Dog.find(function(err, dogs) {
       if (err) { return next(err); }
       res.json({'dogs': dogs });
   });
});


 
// Return the dogs with the given ID
router.get('/api/dogs/:id', function(req, res, next) {
   var id = req.params.id;
   Dog.findById(id, function(err, dog) {
       if (err) { return next(err); }
       if (dog === null) {
           return res.status(404).json({'message': 'Dog not found!'});
       }
       res.json(dog);
   });
});
 
// Update the dog with the given ID
router.put('/api/dogs/:id', function(req, res, next) {
   var id = req.params.id;
   Dog.findById(id, function(err, dog) {
       if (err) { return next(err); }
       if (dog === null) {
           return res.status(404).json({'message': 'Dog not found!'});
       }
       dog.owner = req.body.user;
       dog.photo = req.body.photo;
       dog.breed = req.body.breed;
       dog.name = req.body.name;
       dog.age = req.body.age;
       dog.save();
       res.json(dog);
   });
});
 
// Partially update the dog with the given ID
router.patch('/api/dogs/:id', function(req, res, next) {
    var id = req.params.id;
    Dog.findByIdAndUpdate(id, req.body,{new: true}, function(err, dog) {
        if (err) {
            return next(err); 
        } else if (dog === null) {
            return res.status(404).json({'message': 'Dog not found!'});
        } else {
            return res.status(200).json(dog);
        }
    })
});

 
// Delete a dog with the given ID
router.delete('/api/dogs/:id', function(req, res, next) {
   var id = req.params.id;
   Dog.findOneAndDelete({_id: id}, function(err, dog) {
       if (err) { return next(err); }
       if (dog === null) {
           return res.status(404).json({'message': 'Dog not found'});
       }
       res.json(dog);
   });
});
 
//Deletes all dogs
router.delete('/api/dogs', function(req, res) {
   Dog.deleteMany({}, function(err, dogs) {
       if (err) {return res.status(409).json({message: 'Dogs not deleted!', 'error': err}); }
       if (dogs === null) {
           return res.status(404).json({'message': 'Dogs not found'});
       }
       res.json(dogs);
   });
});
 
module.exports = router;
