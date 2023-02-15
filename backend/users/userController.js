const userService = require('./userService');


createUser = async(req,res)=>{

    try{
        const result =  await userService.createUser(req.body);
        console.log(result.status)
        res.send({ "status": result.status,"result": result.msg});
        
            
            
    }catch(err){
        console.log(err);
        res.send({"message": err.message});
    }
}

module.exports = {createUser};