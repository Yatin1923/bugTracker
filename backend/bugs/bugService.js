const { db } = require("../users/userModel")
const userModel = require("../users/userModel")
const bugModel = require("../bugs/bugModel");
let id = 1;
createBug = async(projectName,user,bug)=>{
    return new Promise(async(resolve,reject) =>{
        console.log("ID",id);
        if(user != null){
            let project = user.projects.find(x=>x.name == projectName);
            if(project){
                let bugExists =  project.bugs.find(x=>x.title == bug.title);
                if(bugExists){
                    return resolve("bug with that name already exists");
                }
                //console.log("Bug",bug.new)
                const bugDetails = new bugModel({
                    id: id,
                    title:bug.title,
                    description:bug.description,
                    assignedTo:bug.assignedTo,
                    new:true,
                    active:false,
                    resolved:false,
                    paused:false
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

                console.log("bugs",project.bugs);
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
            let project = user.projects.find(x=>x.name==projectName);
           // console.log(project);
        if(project){
            let bug = project.bugs.find(x=>x._id==bugId);
            if(bug){

               // console.log(bug);
                bug.title = newBug.title;
                bug.assignedTo = newBug.assignedTo;
                bug.description = newBug.description;
                bug.new = newBug.new?newBug.new:newBug.active?false:newBug.resolved?false:newBug.paused?false:true;
                bug.active = newBug.active?newBug.active:false;
                bug.resolved = newBug.resolved?newBug.resolved:false;
                bug.paused = newBug.paused?newBug.paused:false;
            }else{
                resolve("no bug with that name found");
            }
        }
        resolve("bug updated")
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
        console.log(project);
        console.log(bugId);
        let bug = project.bugs.find(x=>x.id==bugId);
        console.log(bug);
        let index = project.bugs.indexOf(bug);
        console.log(index);
        project.bugs.splice(index,1);
    }
    resolve({message:"bug deleted"});
    await user.save();
}
});
}
module.exports = {createBug,getBugs,updateBug,deleteBug};

