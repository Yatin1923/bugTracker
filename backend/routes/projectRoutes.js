const express = require('express');
const projectsController = require('../projects/projectsController.js');
const bugController = require('../bugs/bugController.js');
var projectsRouter = express.Router();

// Create,Get Project
projectsRouter.route('').post(projectsController.createProject).get(projectsController.getProjects,(req,res)=>{
   // console.log(req.user.email)
    res.send(req.user.email)
});


// Update,Delete Project
projectsRouter.route('/:name').post(projectsController.updateProject).delete(projectsController.deleteProject).put(projectsController.updateProject);

// Create, Get bugs
projectsRouter.route('/:projectName/bugs').post(bugController.createBug).get(bugController.getBugs);

// Update, Delete bugs
projectsRouter.route('/:projectName/bugs/:bugId').put(bugController.updateBug).delete(bugController.getBugs);

module.exports = projectsRouter;