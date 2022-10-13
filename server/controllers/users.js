var express = require('express');
var router = express.Router();
var User = require('../models/user');

// create new user
router.post('/api/users', function(req, res, next){
    var user = new User(req.body);
    user.save(function(err, user) {
        if (err) { return next(err); }
        res.status(201).json(user);
    })
}); 

// get all users
router.get('/api/users', function(req, res, next) {
    User.find(function(err, users) {
        if (err) { return next(err); }
        res.json({'users': users });
    });
});

// Find user by ID
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

// Update the user with the given ID
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
        user.posts = req.body.posts;
        user.save();
        res.json(user);
    });
 });

//Partially update the user with the given ID
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
        user.posts = req.body.posts || user.posts;
        user.save();
        res.json(user);
    });
 });
 
// Delete user by id
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

//Delete all users
router.delete('/api/users', function (req, res, next) {
    User.remove({}, function (err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "Message": "User not found" });
        }
        res.json(user);
    });
});

module.exports = router;
