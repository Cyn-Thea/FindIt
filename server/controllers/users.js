var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');

// create new user(works)
router.post('/api/users', function(req, res, next){
    var user = new User(req.body);
    user.save(function(err, user) {
        if (err) { return next(err); }
        res.status(201).json(user);
    })
});

 // create new post (works)
router.post('/api/users/:id/posts', function(req, res, next) {
    var id = req.params.id;
    var post = new Post(req.body);
    
    User.findById(id, function(err, user) {
        if (user == null) {
            return res.status(404).json({"message": "user not found"});
        }
        if (err) { return next(err); }

        post.user = user._id;
        user.posts.push(post);
        user.save();
    });
     post.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(post);
    });
});


// get all users (works)
router.get('/api/users', function(req, res, next) {
    User.find(function(err, users) {
        if (err) { return next(err); }
        res.json({'users': users });
    });
});

// Find user by ID (works)
router.get('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'Message': 'User not found!'});
        }
        res.json(user);
    });
});

 // get all posts of a user(works)
 router.get('/api/users/:id/posts', function (req, res, next) {
    var id = req.params.id;
   User.findById(id, function (err, user) {
        if (err) { 
            return next(err); }
    }).populate('posts').exec(function (err, user) {
        if (user == null) { 
            var err = new Error('No user found');
            err.status = 404;
            return next(err); 
        } 
        if (user.posts.length == 0) {
            var err = new Error('No posts found');
            err.status = 404;
            return next(err);
        }
        console.log('posts with specified post retreived');
        res.status(200).json(user);
    });
});

// Update the user with the given ID (works)
router.put('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'Message': 'User not found!'});
        }
        user.username = req.body.username;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.collections = req.body.collections;
        user.posts = req.body.posts;
        user.save();
        res.json(user);
    });
 });

//Partially update the user with the given ID (works)
router.patch('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'Message': 'User not found!'});
        }
        user.username = req.body.username || user.username;
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.collections = req.body.collections || user.collections;
        user.posts = req.body.posts || user.posts;
        user.save();
        res.json(user);
    });
 });
 
// Delete user by id(works)
router.delete('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findOneAndDelete({_id: id}, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'Message': 'User not found'});
        }
        res.json(user);
    });
});

//Delete all
router.delete('/api/users/', function (req, res, next) {
    User.remove({}, function (err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "Message": "User not found" });
        }
        res.json(user);
    });
});

module.exports = router;