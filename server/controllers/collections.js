var express = require('express');
var router = express.Router();
var Collection = require('../models/collection');
var Post = require('../models/post');
var PostController = require('../controllers/posts');
var User = require('../models/user');

// create new collection (works)
router.post('/api/collections', function(req, res, next){
    var collection = new Collection(req.body);
    collection.save(function(err, collection) {
        if (err) { return next(err); }
        res.status(201).json(collection);
    })
});

// get all collections (works)
router.get('/api/collections', function(req, res, next) {
    Collection.find(function(err, collections) {
        if (err) { return next(err); }
        res.json({'collections': collections });
    });
});

// Return collection with the given ID (works)
router.get('/api/collections/:id', function(req, res, next) {
    var id = req.params.id;
    Collection.findById(id, function(err,collection) {
        if (err) { return next(err); }
        if (collection === null) {
            return res.status(404).json({'message': 'collection not found!'});
        }
        res.json(collection);
    });
 });

 // a user creating a new collection //works
router.post('/api/users/:userID/collections', function (req, res, next) {
    var userID = req.params.userID;
    var collection = new Collection(req.body);
    User.findById(userID, function (err, user) {
        if (err) {
            if (err instanceof mongoose.CastError) {
                err.status = 400;
                err.message = 'Invalid user ID';
            }
            return next(err);
        }
        if (user == null) {
            var err = new Error('No User found');
            err.status = 404;
            return next(err);
        }
        collection.save(function (err, collection) {
            if (err) {
                if (err.name == 'ValidationError') {
                    err.title = 'ValidationError. Incorrect data input.';
                   err.status = 422;
                }
                return next(err);
            }
            user.collections.push(collection._id);
            user.save();
            console.log('Collection created');
            return res.status(201).json(collection);
        })
    })
});

// get a list all of collections a user has saved (works)
router.get("/api/users/:userID/collections", function (req, res, next) {
    var userID = req.params.userID;
    User.findById(userID, function (err, user) {
        if (err) {
            return next(err);
        }
    }).populate('collections').exec(function (err, user) {
        if (err) {
            if (err instanceof mongoose.CastError) {
                err.status = 400;
                err.message = 'Invalid user ID';
            }
            return next(err);
        }
        if (user == null) {
            var err = new Error('No User found');
            err.status = 404;
            return next(err);
        }
        if (user.collections.length == 0) {
            var err = new Error('No user collections found');
            err.status = 404;
            return next(err);
        }
        console.log(`User collections retrieved`);
        res.status(200).json(user.collections);
    });
});

// get a specific users specific colloction (works)
router.get("/api/users/:userID/collections/:collectionID", function (req, res, next) {
    var userID = req.params.userID;
    var collectionID = req.params.collectionID;
    User.findOne({ _id: userID }, { "collections": collectionID })
        .populate("collections").exec(function (err, user) {
            if (err) {
                if (err instanceof mongoose.CastError) {
                    err.status = 400;
                    err.message = 'Invalid user ID or collection ID';
                }
                return next(err);
            }
            if (user == null) {
                var err = new Error('No User found');
                err.status = 404;
                return next(err);
            }
            console.log('User specific collection retreived');
            res.status(200).json(user);
        });
});

// Update the collection with the given ID (works)
router.put('/api/collections/:id', function(req, res, next) {
    var id = req.params.id;
    Collection.findById(id, function(err, collection) {
        if (err) { return next(err); }
        if (collection === null) {
            return res.status(404).json({'message': 'Collection not found!'});
        }
       collection.title = req.body.title;
       collection.post_id = req.body.post_id;
      collection.save();
        res.json(collection);
    });
 });


//Partially update the collection with the given ID (works)
router.patch('/api/collections/:id', function(req, res, next) {
    var id = req.params.id;
    Collection.findById(id, function(err, collection) {
        if (err) { return next(err); }
        if (collection === null) {
            return res.status(404).json({'message': 'Collection not found!'});
        }
        collection.title = req.body.title|| collection.title;
        collection.post_id = req.body.post_id || collection.post_id;
        collection.save();
        res.json(collection);
    });
 });

// Delete collection by id (works)
router.delete('/api/collections/:id', function(req, res, next) {
    var id = req.params.id;
    Collection.findOneAndDelete({_id: id}, function(err, collection) {
        if (err) { return next(err); }
        if (collection === null) {
            return res.status(404).json({'message': 'Collection not found'});
        }
        res.json(collection);
    });
});


// Delete collection by id
router.delete('/api/users/:userID/collections/:collectionID', function(req, res, next) {
    var id = req.params.id;
    Collection.findOneAndDelete({_id: id}, function(err, collection) {
        if (err) { return next(err); }
        if (collection === null) {
            return res.status(404).json({'message': 'Collection not found'});
        }
        res.json(collection);
    });
});

module.exports = router;