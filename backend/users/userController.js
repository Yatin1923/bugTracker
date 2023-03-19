const userService = require('./userService');
//const { isAuthenticated } = require('../passport-config');

createUser = async(req,res)=>{

    try{
        const result =  await userService.createUser(req.body);
        res.send({ "status": result.status,"result": result.msg});
        
            
            
    }catch(err){
        res.send({"message": err.message});
    }
}
logoutUser = async(req,res)=>{
    const result = await userService.logoutUser(req);    
    res.send(result);
    
}

isAuthenticated = async(req, res)=>{
    const result =  await userService.isAuthenticated(req);    
    res.send(result);

} 

getUsers= async(req, res)=>{
    const result = await userService.getUsers(req);
    console.log(result);
    res.send(result);
}
module.exports = { createUser,logoutUser,isAuthenticated,getUsers};
