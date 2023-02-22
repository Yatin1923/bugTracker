const express = require('express');
const app = express();
const cors=require('cors');
const mongoose = require('mongoose');
const userRouter = require('./routes/userRoutes');
const projectsRouter = require('./routes/projectRoutes');
mongoose.set('strictQuery',false);

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.listen(3000,(err)=>{
    if(err)
    console.log(err)
    else
    console.log('server started...');
});
app.use(express.json());
app.use('/user',userRouter);
app.use('/projects',projectsRouter);

mongoose.connect('mongodb://127.0.0.1/bugTracker',(err)=>{
    if(err)
    console.log(err);
    else
    console.log('Connected to database successfully');
})
