const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require('bcrypt');
const userModel = require("./users/userModel");

function initialize(passport, email) {
  const authenticateUser = async (email, password, done) => {
    console.log(password);
    userModel.findOne({ email: email }, (err, user) => {
      if (err) {
        return done(err)
      }
      console.log(user);
    if (user == null) {
      return done(null, false, { message: "User not found" });
    }

      
      bcrypt.compare(password, user.password, (err, same) => {
        if (err) {
          return done(err);
        }
        console.log(same)
        if (same) {
          return done(null,user)
        }
         return done(null,'Invalid credentials')
      })
        
     
    });
  };

  passport.use(new LocalStrategy({ usernameField: "email", passwordField:"password" }, authenticateUser));
  passport.serializeUser((user, done) => done(null, user));
  passport.deserializeUser((user, done) => {
    return done(null, user);
  });
}

module.exports = initialize;
