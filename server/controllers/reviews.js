var express = require('express');
var router = express.Router();
var Review = require('../models/review');


// create new review
router.post('/api/reviews', function(req, res, next){
    var review = new Review(req.body);
    review.save(function(err, review) {
        if (err) { return next(err); }
        res.status(201).json(review);
    })
});

// Return a list of all reviews
router.get('/api/reviews', function(req, res, next) {
    Review.find(function(err, reviews) {
        if (err) { return next(err); }
        res.json({'reviews': reviews });
    });
 });

// Return the review with the given ID
router.get('/api/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    Review.findById(id, function(err, review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({'message': 'Review not found!'});
        }
        res.json(review);
    });
 });

 //using put function
router.put('/api/reviews/:id',function(req,res,next) {
    var id = req.params.id;
    Review.findById(id, function(err, review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({'message': 'Review not found!'});
        }
        review.author = req.body.author;
        review.rating = req.body.rating; 
        review.comment = req.body.comment;
        review.place_data = req.body.place_data;
        review.save();
        res.json(review);
    });
});


//using patch function
router.patch('/api/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    Review.findByIdAndUpdate(id, req.body,{new: true}, function(err, review) {
        if (err) {
            return next(err); 
        } else if (review === null) {
            return res.status(404).json({'message': 'Review not found!'});
        } else {
            return res.status(200).json(review);
        }
    })
});

// Delete a review with the given ID
router.delete('/api/reviews/:id', function(req, res, next) {
    var id = req.params.id;
    Review.findOneAndDelete({_id: id}, function(err, review) {
        if (err) { return next(err); }
        if (review === null) {
            return res.status(404).json({'message': 'Review not found'});
        }
        res.json(review);
    });
 });

    //Delete all
router.delete('/api/reviews',function(req,res,next){
    Review.deleteMany({},function(err,reviews){
        if(err){return next(err);}
        if(reviews==null){return res.status(404).json({"message":"Reviews not found"});}
        res.json(reviews);
    });
});
module.exports = router;