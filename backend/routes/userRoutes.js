const express = require('express');
const passport = require('passport');
var userController = require('../users/userController.js');
const userRouter = express.Router();

userRouter.route('/signup').post(userController.createUser)
userRouter.route('/login').post( passport.authenticate('local', {
  successRedirect: 'http://localhost:4200/projects',
  failureRedirect: '/error',
  //successFlash: true,
  //failureFlash:true
}))

module.exports = userRouter;
