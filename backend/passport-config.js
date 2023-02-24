const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const userModel = require("./users/userModel");

exports.initializePassport = (passport)=>{
  console.log("initializing passport");
  passport.use(new LocalStrategy({usernameField:"email"},async(username,password,done)=>{
    try{

      const user = await userModel.findOne({email:username})
      // console.log(user);
      if(!user)return done(null,false);
      
      const same = await bcrypt.compare(password,user.password);
      console.log(same);
      if(!same)return done(null,false);
      
      return done(null,user);

    }catch(err){
      console.log("Error: "+err)
      return done(err,false);

    }
    })
  );
    passport.serializeUser((user,done)=>{
      console.log("serializing user:" +user);

      done(null,user.id);
    });
    passport.deserializeUser((id,done)=>{
    try{
      console.log("deserializing user:" + id);
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
  if(req.user) return next();

  res.redirect("/");
}
