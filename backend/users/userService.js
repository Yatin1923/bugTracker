const userModel = require('./userModel');
const bcrypt = require('bcrypt');
const { async } = require('rxjs');


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
                                console.log(_user);
                                bcrypt.hash(_user.password,10).then(async(hash)=>{
         
                                    const userDetails = new userModel({
                                         email : _user.email,
                                         password:hash,
                                         firstname:_user.firstname,
                                         lastname : _user.lastname
                                        });
                                        await userDetails.save();
                                    })
                                resolve({status:true,msg:'Account created successfully'});
                                
                            }
                        }
                });

            }) 

};

module.exports = {createUser};