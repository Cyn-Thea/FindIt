var express = require('express');
var router = express.Router();
var Trip = require('../models/trip');


//Creates a new trip object.
router.post('/api/trips', function(req, res, next){
    var trip = new Trip(req.body);
    trip.save(function(err, trip) {
        if (err) { return next(err); }
        res.status(201).json(trip);
    })
});

router.get('/api/trips', function(req, res, next) {
    Trip.find(function(err, trips) {
        if (err) { return next(err); }
        res.json({'trips': trips });
    });
});

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

module.exports = router;
