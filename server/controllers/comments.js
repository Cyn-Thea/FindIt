var express = require('express');
var router = express.Router();
var Comment = require('../models/comment');
var Post = require('../models/post');
var User = require('../models/user')

// create new comment (works)
router.post('/api/comments', function(req, res, next){
    var comments = new Comment(req.body);
    comments.save(function(err, comments) {
        if (err) { return next(err); }
        res.status(201).json(comments);
    })
});

// create new comment ()
router.post('/api/posts/:post_id/comments', function(req, res, next) {
    var post_id = req.params.post_id;
    var comment = new Comment(req.body);
    
    Post.findById(post_id, function(err, post) {
        if (post == null) {
            return res.status(404).json({"message": "post not found"});
        }
        if (err) { return next(err); }

        comment.post = post._id;
        post.comments.push(comment);
        post.save();
    });

    comment.save(function(err) {
        if (err) { return next(err); }
        res.status(201).json(comment);
    });
});

// Return a list of all comments (works)
router.get('/api/comments', function(req, res, next) {
    Comment.find(function(err, comments) {
        if (err) { return next(err); }
        res.json({'comments': comments });
    });
 });

// Return the comment with the given ID(works)
router.get('/api/comments/:id', function(req, res, next) {
    var id = req.params.id;
    Comment.findById(id, function(err, comment) {
        if (err) { return next(err); }
        if (comment === null) {
            return res.status(404).json({'message': 'Comment not found!'});
        }
        res.json(comment);
    });
 });

 // get all comments under a post(works)
router.get('/api/posts/:id/comments', function (req, res, next) {
    var id = req.params.id;
    Post.findById(id, function (err, post) {
        if (err) { 
            return next(err); }
    }).populate('comments').exec(function (err, post) {
        if (post == null) { 
            var err = new Error('No Post found');
            err.status = 404;
            return next(err); 
        } 
        if (post.comments.length == 0) {
            var err = new Error('No comments found');
            err.status = 404;
            return next(err);
        }
        console.log('comments with specified post retreived');
        res.status(200).json(post);
    });
});

 //using put function (works)
router.put('/api/comments/:id',function(req,res,next) {
    var id = req.params.id;
   Comment.findById(id, function(err, comment) {
        if (err) { return next(err); }
        if (comment === null) {
            return res.status(404).json({'message': 'Comment not found!'});
        }
        comment.comment = req.body.comment;
        comment.save();
        res.json(comment);
    });
});

//using patch function (works)
router.patch('/api/comments/:id', function(req, res, next) {
    var id = req.params.id;
    Comment.findByIdAndUpdate(id, req.body,{new: true}, function(err,comment ) {
        if (err) {
            return next(err); 
        } else if (comment === null) {
            return res.status(404).json({'message': 'Comment not found!'});
        } else {
        comment.comment = (req.body.comment || comment.comment);
        comment.save();
        res.json(comment);
        }
    })
});

// Delete a comment with the given ID (works)
router.delete('/api/comments/:id', function(req, res, next) {
    var id = req.params.id;
    Comment.findOneAndDelete({_id: id}, function(err, comment) {
        if (err) { return next(err); }
        if (comment === null) {
            return res.status(404).json({'message': 'Comment not found'});
        }
        res.json(comment);
    });
 });

 // delete a certain comment under a post (works)
router.delete('/api/posts/:postId/comments/:commentId', function (req, res, next) {
    var postId = req.params.postId;
    var commentId = req.params.commentId;
    Post.findById(postId, function(err, post){
        if (err) { return next(err) }
        if (post === null) { 
            return res.status(404).json({ message: "Post not found" }); }
       Comment.findOneAndDelete({ _id: commentId}, async function(err, comment) {
            if (err) { 
                return next(err); } 
            if (comment == null) { 
                return res.status(404).json({ message: "Comment not found" }); }
            try {
                await Post.updateOne({_id: post._id}, { $pullAll: {comments: [comment._id] }} );
                res.status(200).json(comment);
                console.log('Specific comment deleted');
            } catch (err) {
                next(err);
            }
        });
    })
});


//Deletes all comments
router.delete('/api/comments', function(req, res) {
    Comment.deleteMany({}, function(err, comments) {
        if (err) {return res.status(409).json({message: 'comments not deleted!', 'error': err}); }
        if (comments === null) {
            return res.status(404).json({'message': 'comments not found'});
        }
        res.json(comments);
    });
 });
 

module.exports = router;
