const express = require('express');
const projectsController = require('../projects/projectsController.js');
var projectsRouter = express.Router();

// Create Project
projectsRouter.route('').post(projectsController.createProject).get(projectsController.getProjects);

// Update Project
projectsRouter.route('/:name').post(projectsController.updateProject).delete(projectsController.deleteProject);


module.exports = projectsRouter;