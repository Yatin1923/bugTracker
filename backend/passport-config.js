const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const userModel = require("./users/userModel");

exports.initializePassport = (passport)=>{
  passport.use(new LocalStrategy({usernameField:"email"},async(username,password,done)=>{
    try{

      const user = await userModel.findOne({email:username})
      if(!user)return done(null,false);
      
      const same = await bcrypt.compare(password,user.password);
      if(!same)return done(null,false);
      
      return done(null,user);

    }catch(err){
      return done(err,false);

    }
    })
  );
    passport.serializeUser((user,done)=>{
      done(null,user.id);
    });
    passport.deserializeUser((id,done)=>{
    try{
      const result = userModel.findById(id,(err,user_)=>{
        if(err)return done(err);
        done(null,user_); 
        
      });
    }
    catch(err){
      done(err,false);
    }
  })
};

exports.isAuthenticated = (req,res,next)=>{
  if(req.user) return true;

  return false;
}
