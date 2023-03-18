const bugService = require('./bugService');


createBug = async(req,res)=>{

   const result = await bugService.createBug(req.params.projectName,req.user,req.body);
   res.send(result);
}

getBugs = async(req, res)=>{
    const result = await bugService.getBugs(req.params.projectName,req.user);
    res.json(result);
}

updateBug = async(req, res)=>{
    const result = await bugService.updateBug(req.params.projectName,req.params.bugId,req.body,req.user);
    res.json(result);
}

module.exports = {createBug,getBugs,updateBug};