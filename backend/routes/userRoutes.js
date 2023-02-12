const express = require('express');
var userController = require('../users/userController.js');
const { async } = require('rxjs');
const userModel = require('../users/userModel');
const userRouter = express.Router();

userRouter.route('/signup').post(userController.createUser)

module.exports = userRouter;