const mongoose = require('mongoose');

const bugSchema = new mongoose.Schema({
    id:{
        type:String,
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
        required:true
    },
    new:{
        type:Boolean,
        required:true,
        default:true
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
    
    
    bugs:[bugSchema],
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
    createdDate:{
        type:Date,
        required:false
    }

});

module.exports = mongoose.model('projects',projectSchema);

