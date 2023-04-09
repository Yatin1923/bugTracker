const bugModel = require("../bugs/bugModel");
let id = 1;
createBug = async(projectName,user,bug)=>{
    return new Promise(async(resolve,reject) =>{
        if(user != null){
            let project = user.projects.find(x=>x.name == projectName);
            if(project){
                let bugExists =  project.bugs.find(x=>x.title == bug.title);
                if(bugExists){
                    return resolve("Bug with that name already exists");
                }
                //console.log("Bug",bug.new)
                const bugDetails = new bugModel({
                    id: id,
                    title:bug.title,
                    description:bug.description,
                    assignedTo:bug.assignedTo,
                    status:bug.status,
                    createdDate : new Date()
                });
                id++;
            project.bugs.push(bugDetails);
            await user.save();
            bug = project.bugs.find(x=>x.title == bug.title);
            resolve(bug.id)
        }else{
           resolve("Project not found");
        }
    }else{
       resolve("User not logged in");
    }
    })  
}

getBugs = async(projectName,user)=>{
    if(user!=null){
        //console.log("user",user);
        let project = await user.projects.find(x=>x.name==projectName);
        if(project){
            if(project.bugs.length > 0){

                id = project.bugs[project.bugs.length-1].id+1;
            }else{
                id =1
            }
            //console.log("ProjectBugs: " + project.bugs);
            return project.bugs;
        }
        else{
            return null;
        }
    }
}

updateBug = async(projectName,bugId,newBug,user)=>{
    return new Promise(async(resolve,reject)=>{

        if(user!=null){
            console.log("user",user);
            let project = user.projects.find(x=>x.name==projectName);
        if(project){
            let bug = project.bugs.find(x=>x.id==bugId);
            if(bug){
                bug.title = newBug.title;
                bug.assignedTo = newBug.assignedTo;
                bug.description = newBug.description;
                bug.status = newBug.status||"new";
                bug.updatedDate = new Date();
                bug.priority = newBug.priority;
                console.log("message",typeof newBug.comments == "string");
                console.log("comment type",typeof newBug.comments,newBug.comments);
                let currentTime = new Date().toLocaleString("en-Us", {timeZone: 'Asia/Kolkata'})
                if(newBug.comments!=null && newBug.comments != '' && typeof newBug.comments == "string"){
                    bug.comments.push({
                        message:newBug.comments,
                        user:{firstname:user.firstname,lastname:user.lastname},
                        time:  currentTime
                    });
                    console.log("Added bug",currentTime);
                }
            }else{
                resolve("No bug with that name found");
            }
        }
        resolve("Bug updated successfully");
        await user.save();
    }
})
}
deleteBug = async(projectName,bugId,user)=>{
    return new Promise(async(resolve,reject)=>{
    if(user!=null){
        let project = user.projects.find(x=>x.name==projectName);
       // console.log(project);
    if(project){
        let bug = project.bugs.find(x=>x.id==bugId);
        let index = project.bugs.indexOf(bug);
        project.bugs.splice(index,1);
    }
    resolve("Bug deleted successfully");
    await user.save();
}
});
}
module.exports = {createBug,getBugs,updateBug,deleteBug};

