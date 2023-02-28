const userModel = require('./userModel');
const bcrypt = require('bcrypt');
const { async } = require('rxjs');
var passport = require('passport');
const initializePassport = require('../passport-config');

createUser = (user)=>{
            console.log(user);
            return new Promise((resolve,reject)=>{
                const _user = user;
                // console.log(user);
                userModel.findOne({email:user.email},async(err,user)=>{
                 
                        if(err){
                            reject({status:false,msg:'Error occured'});
                        }
                        else{

                            if(user != undefined && user !=null ){
                                resolve({status:false,msg:'Account with this email already exists'});
                                
                            }else{
                                console.log(_user);
                                bcrypt.hash(_user.password,10).then(async(hash)=>{
         
                                    const userDetails = new userModel({
                                         email : _user.email,
                                         password:hash,
                                         firstname:_user.firstname,
                                         lastname: _user.lastname,
                                         projects:[]
                                        });
                                        await userDetails.save();
                                    })
                                resolve({status:true,msg:'Account created successfully'});
                                
                            }
                        }
                });

            }) 

};

logoutUser = (req)=>{
    return new Promise ((resolve,reject)=>{

        req.logOut((err,res)=>{
            if(err){
                console.log(err);
                reject("Error: "+err);
                
            }else{
                // console.log(result);
                resolve("logged out successfully");
                
            }
        });    
    })
}
isAuthenticated = async(req,res)=>{   
    return req.isAuthenticated();
}


module.exports = { createUser,logoutUser,isAuthenticated};
