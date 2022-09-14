var express = require('express');
var router = express.Router();
var Place = require('../models/place');


//Creates a new place object.
router.post('/api/places', function(req, res, next){
    var place = new Place(req.body);
    place.save(function(err, place) {
        if (err) { return next(err); }
        res.status(201).json(place);
    })
});

router.get('/api/places', function(req, res, next) {
    Place.find(function(err, places) {
        if (err) { return next(err); }
        res.json({'places': places });
    });
});

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

module.exports = router;
