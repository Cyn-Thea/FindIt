var express = require('express');
var router = express.Router();
var Review = require('../models/review');


// create new review
router.post('/api/reviews', function(req, res, next){
    var review = new Review (req.body);
    Review.save(function(err, review) {
        if (err) { return next(err); }
        res.status(201).json(review);
    })
});


// get all comments
router.post('/api/reviews', function (req, res, next) {
    var reviews = new Reviews(req.body);
    Review.save(function (err, reviews) {
        if (err) { return next(err); }
        res.status(201).json(reviews);
    })
});

//Get comments by ID
router.get('/api/reviews/:_id',function(req,res,next){
    var id = req.params._id;
    Review.findById(id,function(err,reviews){
        if(err){
            return next(err);
        }
        res.json({"reviews":reviews})
    });
});
//Delete all
router.delete('/api/reviews',function(req,res,next){
    Review.deleteMany({},function(err,reviews){
        if(err){
            return next(err);
        }
        if(reviews==null){
            return res.status(404).json({"message":"Review not found"});
        }
        res.json(reviews);
    });

});
//using patch function

router.patch('/api/reviews/:_id',function(req,res,next){
    var id = req.params._id;
    Review.findById(id,function(err,reviews){
        if(err){
            return next(err);
        }
        if(reviews == null){
            return res.status(404).json({"message":"review not found"});
        }
        reviews.author = (req.body.username || reviews.author);
        reviews.rating = (req.body.rating  || comments.rating);
        reviews.comment = (req.body.comment  || comments.comment);
        
    
        reviews.save();
        res.json(reviews);

    });
});

