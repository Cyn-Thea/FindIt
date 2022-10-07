const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const User = require("../models/user")
var newSavedPost = require('../models/post');
const jwt = require('jsonwebtoken');


// Login
router.post('/api/users/login', (req, res, next) => {
        var Email = req.body.email;
        var Password = req.body.password;
    User.findOne({ email:  Email }, (err, user) => {
        if (err) return res.status(500).json({
          title: 'server error',
          error: err
        })
        if (!user) {
          return res.status(401).json({
            title: 'user not found',
            error: 'incorrect email'
          })
        }
        //not working 
        if (!bcrypt.compare(Password, user.password)) {
          return res.status(401).json({
            tite: 'login failed',
            error: 'incorrect password'
          })
        }
        try {
          let token = jwt.sign({ userId: user._id}, 'secretkey');
          return res.status(200).json({
            title: 'login sucess',
            token: token
          })
        } 
        catch (err) {
          return res.status(400).json({
            title: 'error',
            error: 'Login failed'
          })
        }
        })
      });

    //grabbing user info
    router.get('/api/user', (req, res, next) => {
    let token = req.headers.token; //token
    jwt.verify(token, 'secretkey', (err, decoded) => {
      if (err) return res.status(401).json({
        title: 'unauthorized'
      })
      //token is valid
      User.findOne({ _id: decoded.userId }, (err, user) => {
        if (err) return console.log(err)
        return res.status(200).json({
          title: 'user grabbed',
          user: {
            firstName: user.firstName,
            lastName: user.lastName,
            password: user.password,
            email: user.email,
            username: user.username,
            posts: user.posts,
            id: user.id
          }
        })
      })
  
    })
  });

  module.exports = router;