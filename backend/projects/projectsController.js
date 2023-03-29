const projectsService = require('./projectsService');
const express = require('express');


getProjects = async(req,res)=>{
    const result = await  projectsService.getProjects(req.user);    
    res.json(result);
}

createProject = async(req,res)=>{

    try{
        const result =  await projectsService.createProject(req.body,req.user);
        res.json(result);
        
            
            
    }catch(err){
        console.log("error",err);
        res.json(err);
    }
}

updateProject = async(req,res)=>{
    try{
        const result = await projectsService.updateProject(req.params.name,req.body,req.user);
        console.log(result);
        res.json(result);

    }catch(err){
        console.log(err);
        res.json(err);
    }
}
deleteProject = async(req,res)=>{
    try{
        const result = await projectsService.deleteProject(req.params.name,req.user)
        console.log(result)
        res.json(result);
    }catch(err){
        console.log(err);
        res.json(err);
    }
}

module.exports = {createProject, updateProject,deleteProject,getProjects};