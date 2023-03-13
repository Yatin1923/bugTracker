const bugService = require('./bugService');


createBug = async(req,res)=>{

   const result = await bugService.createBug(req.params.name,req.user,req.body);
   res.send(result);
}

getBugs = async(req, res)=>{
    const result = await bugService.getBugs(req.params.name,req.user);
    res.json(result);
}

updateBug = async(req, res)=>{
    const result = await bugService.updateBug(req.params.projectName,req.params.bugName,req.body,req.user);
    res.json(result);
}

module.exports = {createBug,getBugs,updateBug};