const express = require('express');
const projectsController = require('../projects/projectsController.js');
var projectsRouter = express.Router();

// Create,Get Project


projectsRouter.route('').post(projectsController.createProject).get(projectsController.getProjects,(req,res)=>{
    console.log(req.user.email)
    res.send(req.user.email)
});

// Update,Delete Project
projectsRouter.route('/:name').post(projectsController.updateProject).delete(projectsController.deleteProject).put(projectsController.updateProject);



module.exports = projectsRouter;