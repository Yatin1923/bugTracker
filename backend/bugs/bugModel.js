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
    status:{
        type:String,
        required:true,
        default:"new"
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

