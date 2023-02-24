const express = require('express');
const passport = require('passport');
var userController = require('../users/userController.js');
const userRouter = express.Router();

userRouter.route('/signup').post(userController.createUser);
userRouter.route('/login').post(passport.authenticate('local'),(req,res)=>{
  res.send(true)
});

module.exports = userRouter;
