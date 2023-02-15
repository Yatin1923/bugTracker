const projectsService = require('./projectsService');


createProject = async(req,res)=>{

    try{
        const result =  await projectsService.createProject(req.body);
        console.log(result)
        res.send(result);
        
            
            
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
deleteProject = async(req,res)=>{
    try{
        const result = await projectsService.deleteProject(req.params.name)
        console.log(result);
        res.send(result);
    }catch(err){
        console.log(err);
        res.send({"message": err.message});
    }
}

module.exports = {createProject, updateProject,deleteProject};