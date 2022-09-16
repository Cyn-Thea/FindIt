var express = require('express');
var router = express.Router();
var Trip = require('../models/trip');
 
 
//Creates a new trip
router.post('/api/trips', function(req, res, next){
   var trip = new Trip(req.body);
   trip.save(function(err, trip) {
       if (err) { return next(err); }
       res.status(201).json(trip);
   })
});
 
// Return a list of all trips
router.get('/api/trips', function(req, res, next) {
   Trip.find(function(err, trips) {
       if (err) { return next(err); }
       res.json({'trips': trips });
   });
});
 
// Return the trips with the given ID
router.get('/api/trips/:id', function(req, res, next) {
   var id = req.params.id;
   Trip.findById(id, function(err, trip) {
       if (err) { return next(err); }
       if (trip === null) {
           return res.status(404).json({'message': 'Trip not found!'});
       }
       res.json(trip);
   });
});
 
// Update the trip with the given ID
router.put('/api/trips/:id', function(req, res, next) {
   var id = req.params.id;
   Trip.findById(id, function(err, trip) {
       if (err) { return next(err); }
       if (trip === null) {
           return res.status(404).json({'message': 'Place not found!'});
       }
       trip.tripID = req.body.tripID;
       trip.price = req.body.price;
       trip.routeStart = req.body.routeStart;
       trip.routeEnd = req.body.routeEnd;
       trip.save();
       res.json(trip);
   });
});
 
// Partially update the trip with the given ID
router.patch('/api/trips/:id', function(req, res, next) {
   var id = req.params.id;
   Trip.findById(id, function(err, trip) {
       if (err) { return next(err); }
       if (trip === null) {
           return res.status(404).json({'message': 'Place not found!'});
       }
       trip.tripID = req.body.tripID || trip.tripID;
       trip.price = req.body.price|| trip.price;
       trip.routeStart = req.body.routeStart|| trip.routeStart;
       trip.routeEnd = req.body.routeEnd|| trip.routeEnd;
       trip.save();
       res.json(trip);
   });
});
 
// Delete a trip with the given ID
router.delete('/api/trips/:id', function(req, res, next) {
   var id = req.params.id;
   Trip.findOneAndDelete({_id: id}, function(err, trip) {
       if (err) { return next(err); }
       if (trip === null) {
           return res.status(404).json({'message': 'Trip not found'});
       }
       res.json(trip);
   });
});
 
//Deletes all trips
router.delete('/api/trips', function(req, res) {
   Trip.deleteMany({}, function(err, trips) {
       if (err) {return res.status(409).json({message: 'Places not deleted!', 'error': err}); }
       if (trips === null) {
           return res.status(404).json({'message': 'Places not found'});
       }
       res.json(trips);
   });
});
 
module.exports = router;
