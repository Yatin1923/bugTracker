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
    },
    createdDate:{
        type:Date,
        required:false
    },
    updatedDate:{
        type:Date,
        required:false
    },
    comments:{
        type:Array,
        required:false
    },
    priority:{
        type:Number,
        required:false
    }

});

module.exports = mongoose.model('bugs',bugSchema);

