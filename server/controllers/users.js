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

/* // create new comment ()
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
    });
     post.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(post);
    });
}); */


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

// get all prosts made by a specific user
router.get('/api/users/:id/posts', function(req, res, next) {
    var id = req.params.id;
    User.findById(id).populate('posts').exec(function(err, user){
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        var posts = user.posts;
        return res.json({'posts': posts });
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