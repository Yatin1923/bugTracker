const userModel = require('./userModel');
const bcrypt = require('bcrypt');
const { async } = require('rxjs');


createUser = (user)=>{
            console.log(user);
            return new Promise((resolve,reject)=>{
                const _user = user;
                console.log(user);
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
loginUser = (user) => {
  console.log(user);
  return new Promise((resolve, reject) => {

    userModel.findOne({ email: user.email }, async (err, _user) => {
      if (err) {
        reject({ status: false, msg: 'Error occured' })
      } else {
        if (_user == null || _user == undefined) {
          resolve({ status: false, msg: 'No account with specified email found' });
        } else {
          bcrypt.compare(user.password, _user.password, (err, same) => {
            if (same) {
              resolve({ status: true, msg: 'Logged in successfully' })
            } else {
              resolve({ status: false, msg: 'Incorrect password' })
            }
          });
          
        }
      }
    });
  });
}

module.exports = { createUser, loginUser };
