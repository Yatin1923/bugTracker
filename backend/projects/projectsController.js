const projectsService = require('./projectsService');


getProjects = async(req,res)=>{
    const result = await  projectsService.getProjects();
    res.json(result);
}

createProject = async(req,res)=>{

    try{
        const result =  await projectsService.createProject(req.body);
        console.log(result.message)
        res.send({"message":result.message});
        
            
            
    }catch(err){
        console.log(err);
        res.send({"message": err.message});
    }
}

updateProject = async(req,res)=>{
    try{
        const result = await projectsService.updateProject(req.params.name,req.body);
        console.log(result);
        res.send(result);

    }catch(err){
        console.log(err);
        res.send({"message": err.message});
    }
}
deleteProject = (req,res)=>{
    try{
        console.log('inside controller')
        const result = projectsService.deleteProject(req.params.name)
        console.log(result);
        res.send(result);
    }catch(err){
        console.log(err);
        res.send({"message": err.message});
    }
}

module.exports = {createProject, updateProject,deleteProject,getProjects};