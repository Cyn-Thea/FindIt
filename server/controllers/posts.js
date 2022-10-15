var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');
 
/* //Creates a new post
router.post('/api/posts', function(req, res, next){
   var post= new Post(req.body);
   post.save(function(err, post) {
       if (err) { return next(err); }
       res.status(201).json(post);
   })
});   */

 // user creates a new post
 router.post('/api/users/:id/posts', function(req, res, next) {
    var id = req.params.id;
    var post = new Post(req.body);
     User.findById(id, function(err, user) {
        if (user == null) {
            return res.status(404).json({"message": "User not found"});
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

// Return a list of all posts
router.get('/api/posts', function(req, res, next) {
   Post.find(function(err, posts) {
       if (err) { return next(err); }
       res.json({'posts': posts });
   });
});

 // get all posts of a user
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

// Return post with the given ID
router.get('/api/posts/:id', function(req, res, next) {
   var id = req.params.id;
   Post.findById(id, function(err,post) {
       if (err) { return next(err); }
       if (post === null) {
           return res.status(404).json({'message': 'post not found!'});
       }
       res.json(post);
   });
});
// filter posts by category
router.get('/api/postFiltered', function(req, res, next) {
    if (!req.query.category){return next();}
    Post.find({
        category: { $regex: req.query.category, $options: 'i' }
    },
        function(err, posts) {
            if (err) { return next(err); }
            if (!posts) { return res.status(404).json(
                {'message': 'no posts found'});
            }
        res.status(200).json(posts);
    });
});

//Get posts sorted by post dates (old to new)
router.get('/api/postSort', function (req, res, next) {
    Post.find().sort({
        date: req.query.sortByDate
    }).exec(function (err, results) {
        if (err) { return next(err); }
        if (!results) { return res.status(404).json({'message': 'no posts found'}); }
        res.status(200).json(results);
    })
});
 
//Update post with the given ID
router.put('/api/posts/:id', function(req, res, next) {
   var id = req.params.id;
   Post.findById(id, function(err, post) {
       if (err) { return next(err); }
       if (post === null) {
           return res.status(404).json({'message': 'post not found!'});
       }
       post.category = req.body.category
       post.title = req.body.title;
       post.description = req.body.description;
       post.author = req.body.author;
       post.building = req.body.building;
       post.comments = req.body.comments;
       post.date= req.body.date;
       post.save();
       res.json(post);
   });
});

//Partially update a post with the given ID
router.patch('/api/posts/:id', function(req, res, next) {
   var id = req.params.id;
   Post.findById(id, function(err, post) {
       if (err) {  
        return res.status(409).json({
        message: 'Post not updated!', 'error': err
    });}
       if (post === null) {
           return res.status(404).json({'message': 'post not found!'});
       }
       post.category = (req.body.category || post.category);
       post.title = (req.body.title || post.title);
       post.description = (req.body.description || post.description);
       post.author = (req.body.author || post.author);
       post.building = (req.body.building || post.building);
       post.comment = (req.body.comment || post.comment);
       post.date = (req.body.room || post.date);
       post.save();
       res.json(post);
   });
});

// Delete a post with the given ID
router.delete('/api/posts/:id', function(req, res, next) {
   var id = req.params.id;
   Post.findOneAndDelete({_id: id}, function(err, post) {
       if (err) { return next(err); }
       if (post === null) {
           return res.status(404).json({'message': 'posts not found'});
       }
       res.json(post);
   });
});

//Deletes all posts
router.delete('/api/posts', function(req, res) {
   Post.deleteMany({}, function(err, posts) {
       if (err) {return res.status(409).json({message: 'posts not deleted!', 'error': err}); }
       if (posts === null) {
           return res.status(404).json({'message': 'posts not found'});
       }
       res.json(posts);
   });
});

module.exports = router;
