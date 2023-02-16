const express = require('express');
const projectsController = require('../projects/projectsController.js');
var projectsRouter = express.Router();

// Create,Get Project
projectsRouter.route('').post(projectsController.createProject).get(projectsController.getProjects);

// Update,Delete Project
projectsRouter.route('/:name').post(projectsController.updateProject).delete(projectsController.deleteProject);


module.exports = projectsRouter;