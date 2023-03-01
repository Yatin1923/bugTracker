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
        projectModel.findOne({name:projectName},async(err,_project)=>{
            if(err){
                reject('Error:' + err)
            }
            if(_project == null || _project == undefined){
                resolve("Project not found");
            }else{
                const projectDetails = new projectModel({
                    _id:_project.id,
                    name : project.name,
                    key: project.key,
                    projectLead: project.projectLead
                });
                await projectModel.findByIdAndUpdate(_project.id,projectDetails);
                resolve("Project updated");
            }
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

            }
        }
        await user.save();
       
    })   
})
}

module.exports = {createProject,updateProject,deleteProject,getProjects};
