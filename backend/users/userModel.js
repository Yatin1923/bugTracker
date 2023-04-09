const mongoose = require('mongoose');

const commentsSchema  = new mongoose.Schema({
    message:{
        type:String,
        required:false
    },
    user:{
        type:{firstname:{type:String, required:false},lastname:{type:String, required:false}},
        required:false
    },
    time:{
        type:String,
        required:false
    }
})

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
        type:[commentsSchema],
        required:false
    },
    priority:{
        type:Number,
        required:false
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
    createdDate:{
        type:Date,
        required:false
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