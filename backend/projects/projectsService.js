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
          }
          var userProjects = user.projects
          var projectExists = false;
          for (var i = 0; i < userProjects.length; i++) {
            if (userProjects[i].name == project.name) {
              reject({ message: "A project with that name already exists" });
              projectExists = true;
            }
          }
          if(!projectExists) {

          const projectDetails = new projectModel({
            name: project.name,
            key: project.key,
            projectLead: project.projectLead
          });
          user.projects.push(projectDetails);
          await user.save();
          resolve({ message: "project created successfully" });
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
              resolve({ message: "project updated successfully" });
          }else{
            resolve({message:"project not found"});
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
        for(var i = 0;i<userProjects.length;i++){
            if(userProjects[i].name == projectName){
                userProjects[i].remove();
                resolve({messge:"project deleted successfully"})
            }
        }
        await user.save();
       
    })   
})
}

module.exports = {createProject,updateProject,deleteProject,getProjects};
