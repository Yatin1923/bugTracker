const express = require('express');
var userController = require('../users/userController.js');
const userRouter = express.Router();

userRouter.route('/signup').post(userController.createUser)
userRouter.route('/login').post(userController.loginUser)

module.exports = userRouter;
