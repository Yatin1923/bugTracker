const { findByIdAndUpdate } = require('./projectsModel');
const projectModel = require('./projectsModel');
const userModel = require('../users/userModel');


// Get All
getProjects = async()=>{
    //let projects = new projectModel();
    const result = await userModel.findOne({email:"yatinchokshi95@gmail.com"},(err, user)=>{
        if(err){
            console.log(err);
        }
        projects = user.projects;
        //console.log(projects);
        return user.projects;
    }).clone();
    return projects;
} 
// Create Project
createProject = (project)=>{
    return new Promise((resolve,reject)=>{
        userModel.findOne({email:"yatinchokshi95@gmail.com"},async(err,user)=>{
            if(err){
                console.log(err);
            }
            projectModel.findOne({name:project.name},async(err,_project)=>{
                if(err){
                    reject({message:"Error creating project"});
                }else{
                    
                    if(_project != null || _project != undefined){
                    resolve({message:"A project with that name already exists"});
                }
                else{
                    console.log(project);
                    const projectDetails = new projectModel({
                        name : project.name,
                        key: project.key,
                        projectLead: project.projectLead
                    });
                    user.projects.push(projectDetails);
                    await user.save();
                    resolve({message:"project created successfully"});
                }
            }
        })
    })
    })
}
// Update project
updateProject = (projectName,project)=>{
    return new Promise((resolve,reject)=>{
        console.log(projectName);
        projectModel.findOne({name:projectName},async(err,_project)=>{
            if(err){
                console.log('inside error')
                reject('Error:' + err)
            }
            if(_project == null || _project == undefined){
                console.log('inside not found')
                resolve("Project not found");
            }else{
                console.log(project);
                const projectDetails = new projectModel({
                    _id:_project.id,
                    name : project.name,
                    key: project.key,
                    projectLead: project.projectLead
                });
                console.log(_project.id);
                await projectModel.findByIdAndUpdate(_project.id,projectDetails);
                resolve("Project updated");
            }
        })
    })
}
// Delete project
deleteProject = async(projectName)=>{
    return new Promise((resolve,reject)=>{userModel.findOne({email:"yatinchokshi95@gmail.com"},async(err,user)=>{
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