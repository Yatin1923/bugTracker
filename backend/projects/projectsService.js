const { findByIdAndUpdate } = require('./projectsModel');
const projectModel = require('./projectsModel');
const userModel = require('../users/userModel');
const { request } = require('express');


// Get All
getProjects = async(user)=>{
    let projects = null;
   if(user){

       await userModel.findOne({email:user.email},(err, user)=>{
           if(err){
               console.log(err);
            }if(user){
                projects = user.projects;
            }
        }).clone();
        return projects;
    }
} 
// Create Project
createProject = (project,user)=>{
    return new Promise((resolve,reject)=>{
        userModel.findOne({ email:user.email},async(err,user)=>{
            if(err){
                console.log(err);
                reject(err);
          }
          var userProjects = user.projects
          var projectExists = false;
          for (var i = 0; i < userProjects.length; i++) {
            if (userProjects[i].name == project.name) {
              reject("Project with that name already exists");
              projectExists = true;
            }
          }
          if(!projectExists) {

          const projectDetails = new projectModel({
            name: project.name,
            key: project.key,
            projectLead: project.projectLead,
            createdDate: new Date()
          });
          user.projects.push(projectDetails);
          await user.save();
          resolve("Project created successfully");
          }
    })
    })
}
// Update project
updateProject = (projectName,project,user)=>{
    return new Promise((resolve,reject)=>{
        userModel.findOne({ email:user.email},async(err,user)=>{
            if(err){
                console.log(err);
                reject(err);
          }
          var userProjects = user.projects;
          var projectExists = false;
          for (var i = 0; i < userProjects.length; i++) {
            if (userProjects[i].name == projectName) {

                projectExists = true;

                userProjects[i].name = project.name;
                userProjects[i].key = project.key;
                userProjects[i].projectLead = project.projectLead;
                break;
            }
          }
          if(projectExists){
              resolve("Project updated successfully" );
          }else{
            reject("Project not found");
          }
          await user.save();
          
    })
    })
}

// Delete project
deleteProject = async(projectName,user)=>{
  return new Promise((resolve, reject) => {
    userModel.findOne({ email:user.email},async(err,user)=>{
       // let userProjects = new projectModel()
        userProjects = user.projects;
        let length = userProjects.length;
        for(var i = 0;i<userProjects.length;i++){
            if(userProjects[i].name == projectName){
                userProjects[i].remove();
            }
        }
        if(length != userProjects.length){
            
            resolve("Project deleted successfully")
        }else{
            resolve("Project not found")
        }
        await user.save();
       
    })   
})
}

module.exports = {createProject,updateProject,deleteProject,getProjects};
