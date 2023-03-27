const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    id:{
        type:Number,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:false
    },
    assignedTo:{
        type:String,
        required:false
    },
    new:{
        type:Boolean,
        required:true,
        default:false
    },
    active:{
        type:Boolean,
        required:true,
        default:false
    },
    resolved:{
        type:Boolean,
        required:true,
        default:false
    },
    paused:{
        type:Boolean,
        required:true,
        default:false
    }

});
const projectSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    key:{
        type:String,
        required:true
    },
    projectLead:{
        type:String,
        required:true
    },
    bugs:[bugSchema]

});

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    firstname:{
        type:String,
        required:false
    },
    lastname:{
        type:String,
        required:false
    },
    projects:[projectSchema],
});



module.exports = mongoose.model('users',userSchema);