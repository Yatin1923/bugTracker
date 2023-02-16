const { findByIdAndUpdate } = require('./projectsModel');
const projectModel = require('./projectsModel')


// Get All
getProjects = async()=>{
    const result = await projectModel.find();
    // console.log(result);
    return result;
} 
// Create Project
createProject = (project)=>{
    return new Promise((resolve,reject)=>{
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
                    await projectDetails.save();
                    resolve({message:"project created successfully"});
                }
            }
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
    return new Promise((resolve,reject)=>{
        console.log(projectName);
        projectModel.findOne({name:projectName},async(err,_project)=>{
            if(err){
                reject('Error:' + err)
            }
            if(_project == null || _project == undefined){
                console.log('inside not found')
                resolve("Project not found");
            }else{
                console.log(_project);
                
                console.log(_project.id);
                await projectModel.findByIdAndDelete(_project.id);
                resolve("Project deleted");
            }
        })
    })   
}

module.exports = {createProject,updateProject,deleteProject,getProjects};