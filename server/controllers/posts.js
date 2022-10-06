var express = require('express');
var router = express.Router();
var Post = require('../models/post');
var User = require('../models/user');
var ObjectId = require('mongoose').Types.ObjectId;
 
//Creates a new post(works)
router.post('/api/posts', function(req, res, next){
   var post= new Post(req.body);
   post.save(function(err, post) {
       if (err) { return next(err); }
       res.status(201).json(post);
   })
});  


// Return a list of all posts (works)
router.get('/api/posts', function(req, res, next) {
   Post.find(function(err, posts) {
       if (err) { return next(err); }
       res.json({'posts': posts });
   });
});

//READ get all projects for a user
router.get('/api/users/:user_id/posts', function(req, res, next) {
    var user_id = req.params.user_id;
    User.findById(user_id).populate('posts').exec(function(err, user){
        if (err) { return next(err); }
        if (user === null) {
            return res.status(404).json({'message': 'User not found'});
        }
        var posts = user.posts;
        return res.json({'posts': posts });
    });
});

 
/* //Get a list of all posts of a user
router.get('/api/user/:id/posts', function(req, res, next) {
    if (req.query.user) {
        var id = req.query.user;
        Post.find({author: id}, function(err, posts) {
            if (err) {
                return res.status(409).json({'message': 'There is no post for this user!', 'error': err});
            }
            if (posts === null) {
                return res.status(404).json({'message': 'Posts not found'});
            }
            res.json(posts);
        });
    }else {
        Post.find(function(err, posts) {
            if (err) {  return res.status(409).json({'message': 'There are no posts!', 'error': err}); }
            res.json({'posts': posts });

        });
    }
});*/

// Return the place with the given ID (works)
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

/*
router.get('api/users/:id/posts', function(req, res, next){
    try {
        var userId = req.params.id;
        User.findById(userId, function (err, user){
            if (err){
                return next(err); }
            if (user == null){
                return res.status(404).json({'message': 'User not found'});
            }
            Post.find({user: user._id}, function(err, posts) {
                if (err){
                    return next(err); }
                var sort = req.query.sort;
                if(!sort){
                    return res.status(200).json({'posts': posts});
                } else {
                    if(sort=== 'asc') {
                        posts.sort((a,b )=> a.date-b.date);
                        res.json({'posts': posts});
                    } else if (sort === 'desc'){
                        posts.sort((a,b)=> b.date-a.date);
                        res.json({'posts': posts});
                    } else {
                        res.status(400).send('Provided invalid sorting parameter');
                    }
                }
            });
        }); 
    } catch (error){
        return res.status(500).json({'message': 'Error fetching all posts for the user'});
    }
}); */


/*// get all posts under a  user
router.get('/api/users/:id/posts', function (req, res, next) {
    var id = req.params.id;
    User.findById(id, function (err, user) {
        if (err) { 
            return next(err); }
    }).populate('posts').exec(function (err, user) {
        if (err) { 
            if (err instanceof mongoose.CastError){
                err.status = 400;
                err.message = 'Invalid user ID';
            }
            return next(err); 
        }
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
        res.status(200).json(user.posts);
    });
});*/
 
//Update the place with the given ID (works)
router.put('/api/posts/:id', function(req, res, next) {
   var id = req.params.id;
   Post.findById(id, function(err, post) {
       if (err) { return next(err); }
       if (post === null) {
           return res.status(404).json({'message': 'post not found!'});
       }
       post.catergory = req.body.catergory
       post.title = req.body.title;
       post.description = req.body.description;
       post.author = req.body.author;
       post.building = req.body.building;
       post.room = req.body.room;
       post.additionalInformation = req.body.additionalInformation;
       post.comments = req.body.comments;
       post.date= req.body.date;
       post.save();
       res.json(post);
   });
});

//Partially update the post with the given ID(works)
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
       post.catergory = (req.body.catergory || post.catergory);
       post.title = (req.body.title || post.title);
       post.description = (req.body.description || post.description);
       post.author = (req.body.author || post.author);
       post.building = (req.body.building || post.building);
       post.room = (req.body.room || post.room);
       post.additionalInformation = (req.body.building || post.additionalInformation);
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

// filter by catergory (works)
router.get('/api/postFiltered', function(req, res, next) {
    if (!req.query.catergory){return next();}
    Post.find({
        catergory: { $regex: req.query.catergory, $options: 'i' }
    },
        function(err, posts) {
            if (err) { return next(err); }
            if (!posts) { return res.status(404).json(
                {'message': 'no posts found'});
            }
        res.status(200).json(posts);
    });
});

//Get posts sorted by post dates (old to new works)
router.get('/api/postSort', function (req, res, next) {
    Post.find().sort({
        date: req.query.sortByDate
    }).exec(function (err, results) {
        if (err) { return next(err); }
        if (!results) { return res.status(404).json({'message': 'no posts found'}); }
        res.status(200).json(results);
    })
});

module.exports = router;
