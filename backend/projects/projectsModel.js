const mongoose = require('mongoose');

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
    }

});

module.exports = mongoose.model('projects',projectSchema);

