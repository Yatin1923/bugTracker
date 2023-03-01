const userModel = require('./userModel');
const bcrypt = require('bcrypt');
const { async } = require('rxjs');
var passport = require('passport');
const initializePassport = require('../passport-config');

createUser = (user)=>{
            return new Promise((resolve,reject)=>{
                const _user = user;
                userModel.findOne({email:user.email},async(err,user)=>{
                 
                        if(err){
                            reject({status:false,msg:'Error occured'});
                        }
                        else{

                            if(user != undefined && user !=null ){
                                resolve({status:false,msg:'Account with this email already exists'});
                                
                            }else{
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

logoutUser = (req,res)=>{
    return new Promise ((resolve,reject)=>{
        req.logOut((err,res)=>{
            if(err){
                reject(err);
                
            }else{
            resolve(true);
                
            }
        });    
    })
}
isAuthenticated = async(req,res)=>{   
    return req.isAuthenticated();
}


module.exports = { createUser,logoutUser,isAuthenticated};
