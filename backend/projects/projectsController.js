const projectsService = require('./projectsService');
const express = require('express');


getProjects = async(req,res)=>{
    const result = await  projectsService.getProjects(req.user);    
    res.json(result);
}

createProject = async(req,res)=>{

    try{
        const result =  await projectsService.createProject(req.body,req.user);
        res.send({"message":result.message});
        
            
            
    }catch(err){
        console.log(err);
        res.send({"message": err.message});
    }
}

updateProject = async(req,res)=>{
    try{
        const result = await projectsService.updateProject(req.params.name,req.body,req.user);
        res.send(result);

    }catch(err){
        console.log(err);
        res.send({"message": err.message});
    }
}
deleteProject = (req,res)=>{
    try{
        const result = projectsService.deleteProject(req.params.name,req.user)
        res.send(result);
    }catch(err){
        console.log(err);
        res.send({"message": err.message});
    }
}

module.exports = {createProject, updateProject,deleteProject,getProjects};