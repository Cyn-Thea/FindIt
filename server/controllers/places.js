var express = require('express');
var router = express.Router();
var Place = require('../models/place');
 
 
//Creates a new place
router.post('/api/places', function(req, res, next){
   var place = new Place(req.body);
   place.save(function(err, place) {
       if (err) { return next(err); }
       res.status(201).json(place);
   })
});
 
// Return a list of all places
router.get('/api/places', function(req, res, next) {
   Place.find(function(err, places) {
       if (err) { return next(err); }
       res.json({'places': places });
   });
});
 
// Return the place with the given ID
router.get('/api/places/:id', function(req, res, next) {
   var id = req.params.id;
   Place.findById(id, function(err, place) {
       if (err) { return next(err); }
       if (place === null) {
           return res.status(404).json({'message': 'Place not found!'});
       }
       res.json(place);
   });
});
 
// Update the place with the given ID
router.put('/api/places/:id', function(req, res, next) {
   var id = req.params.id;
   Place.findById(id, function(err, place) {
       if (err) { return next(err); }
       if (place === null) {
           return res.status(404).json({'message': 'Place not found!'});
       }
       place.name = req.body.name;
       place.street = req.body.street;
       place.zipcode = req.body.zipcode;
       place.city = req.body.city;
       place.placeID = req.body.placeID;
       place.score = req.body.score;
       place.save();
       res.json(place);
   });
});
 
// Partially update the place with the given ID
router.patch('/api/places/:id', function(req, res, next) {
   var id = req.params.id;
   Place.findById(id, function(err, place) {
       if (err) { return next(err); }
       if (place === null) {
           return res.status(404).json({'message': 'Place not found!'});
       }
       place.name = req.body.name || place.name;
       place.street = req.body.street || place.street;
       place.zipcode = req.body.zipcode || place.zipcode;
       place.city = req.body.city || place.city;
       place.placeID = req.body.placeID || place.placeID;
       place.score = req.body.score || place.score;
       place.save();
       res.json(place);
   });
});
 
// Delete a place with the given ID
router.delete('/api/places/:id', function(req, res, next) {
   var id = req.params.id;
   Place.findOneAndDelete({_id: id}, function(err, place) {
       if (err) { return next(err); }
       if (place === null) {
           return res.status(404).json({'message': 'Place not found'});
       }
       res.json(place);
   });
});
 
//Deletes all places
router.delete('/api/places', function(req, res) {
   Place.deleteMany({}, function(err, places) {
       if (err) {return res.status(409).json({message: 'Places not deleted!', 'error': err}); }
       if (places === null) {
           return res.status(404).json({'message': 'Places not found'});
       }
       res.json(places);
   });
});
 
module.exports = router;
