const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs")
const User = require("../models/user")
const jwt = require('jsonwebtoken');

//SignUp
router.post("/api/users/signUp", async (req, res, next) => {
    var newUser = new User({
      username: req.body.username,
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password
    })
    try {
      var savedUser = await newUser.save();
      res.status(200).json({
        savedUser,
        title: 'Signup Success' })
    } 
    catch (err) {
      return res.status(400).json({
        title: 'error',
        error: 'email in use'
      })
    }
    });
  
    //Login
router.post('/api/users/login', (req, res, next) => {
        var email = req.body.email;
        var password = req.body.password;
    User.findOne({ email:  email }, (err, user) => {
        if (err) return res.status(500).json({
          title: 'server error',
          error: err
        })
        if (!user) {
          return res.status(401).json({
            title: 'user not found',
            error: 'invalid credentials'
          })
        }
        //not working 
        if (!bcrypt.compare(password, user.password)) {
          return res.status(401).json({
            tite: 'login failed',
            error: 'invalid credentials password'
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
            error: 'Unable To Login'
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
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            password: user.password,
            id: user.id
          }
        })
      })
  
    })
  });

  module.exports = router;