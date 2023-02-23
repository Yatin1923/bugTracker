const express = require('express');
const app = express();
const cors=require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const projectsRouter = require('./routes/projectRoutes');
const session = require('express-session')
const passport = require('passport');
const { initializePassport } = require('./passport-config');

mongoose.set('strictQuery',false);
mongoose.connect('mongodb://127.0.0.1/bugTracker',(err)=>{
    if(err)
    console.log(err);
    else
    console.log('Connected to database successfully');
})


initializePassport(passport);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret:"secret",
  resave:false,
  saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());


app.use(cors());
app.use('/user',userRouter);
app.use('/projects',projectsRouter);







app.listen(3000,(err)=>{
    if(err)
    console.log(err)
    else
    console.log('server started...');
});

