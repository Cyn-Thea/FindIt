var express = require('express');
var router = express.Router();
var User = require('../models/user');
var Post = require('../models/post');
var PostController = require('../controllers/posts');


// create new user
router.post('/api/users', function(req, res, next){
    var user = new User(req.body);
    user.save(function(err, user) {
        if (err) { return next(err); }
        res.status(201).json(user);
    })
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
            return res.status(404).json({'message': 'User not found!'});
        }
        res.json(user);
    });
});

/*//GET posts user has by user id.
router.get('/:id/posts', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, async function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        };
        if(user.post.length === 0) {
            return res.status(404).json({'message': 'User has no posts.'})
        };
        var arr = [];
        for(el of user.post) {
            var post= await post.findById(el).exec(); 
            arr.push(post);
        }
        res.status(200).json(arr);
    });
});

//DELETE a specific post from a specific user by id.
router.delete('/:id/posts/:postID', function(req, res, next){
    var id = req.params.id;
    var postID = req.params.postID;
    User.findById(id, function(err, user){
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        };
        user.post.pull(postID);
        user.save();
        Post.findByIdAndDelete(postID, function(err, post){
            if (err) { return next(err); }
            if (post === null) {
                return res.status(404).json({'message': 'Post not found'});
            };
            res.status(200).json({'message': 'Post deleted succesfully!'});
        });
    });
});

// Add posts to user collection of saved posts
router.post('/:id/posts', function(req, res){
    var id = req.params.id;
    var trip = req.body.post;
    User.findById(id, function(err, user){
        if (err) { return res.status(404).json({'message': 'User not found!', 'error': err}); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        if (post === null) {
            return res.status(404).json({'message': 'Post not found'});
        }
        if(user.posts.includes(post)){
            return res.status(409).json({'message': 'Post already exists in user list'});
        }  
        user.posts.push(trip);
        user.save();
        res.json(user);
    });
});


// Remove posts from user collection
router.delete('/:id/posts/:postId', function(req, res) {
    var id = req.params.id;
    var postId = req.params.postId;
    User.findById(id, function(err, user) {
        if (err) {  return res.status(404).json({'message': 'User not found!', 'error': err}); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        try{
            let index = user.posts.indexOf(postId);
            user.posts.splice(index, 1);
            user.save();
            res.json(user);
        }
        catch(error){
            return res.status(404).json({'message': 'Post ID not valid!', 'error': error});
        }
    });
});
*/

// Update the user with the given ID (works)
router.put('/api/users/:id', function(req, res, next) {
    var id = req.params.id;
    User.findById(id, function(err, user) {
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found!'});
        }
        user.username = req.body.username;
        user.firstName = req.body.firstName;
        user.lastName = req.body.lastName;
        user.email = req.body.email;
        user.password = req.body.password;
        user.university = req.body.university;
        user.campus = req.body.campus;
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
            return res.status(404).json({'message': 'User not found!'});
        }
        user.username = req.body.username || user.username;
        user.firstName = req.body.firstName || user.firstName;
        user.lastName = req.body.lastName || user.lastName;
        user.email = req.body.email || user.email;
        user.password = req.body.password || user.password;
        user.university = req.body.university || user.university;
        user.campus = req.body.campus || user.campus;
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
            return res.status(404).json({'message': 'User not found'});
        }
        res.json(user);
    });
});

//Delete all
router.delete('/api/users/', function (req, res, next) {
    User.remove({}, function (err, user) {
        if (err) { return next(err); }
        if (user == null) {
            return res.status(404).json({ "message": "users not found" });
        }
        res.json(users);
    });
});

module.exports = router;