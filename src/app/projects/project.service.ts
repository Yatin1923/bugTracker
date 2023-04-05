import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { NotifyService } from '../shared/notifyService/notify.service';
import { projectModel } from './project.model';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {

  basedUrl:string = "http://localhost:3000/projects"


  constructor(private http: HttpClient,private notify:NotifyService) { }

// Get Projects
  getProject(){
    const result = this.http.get(this.basedUrl, {withCredentials: true});
    return result;
  }

  // Delete Projects
  deleteProject(name:String){
    const url = this.basedUrl +'/'+name;
    const result = this.http.delete(url, {withCredentials: true})
    return result;
  }
  
  // Edit projects
  editProject(_name:string,name:String,key:String,projectlead:String){
    // console.log("editProject: ",_name)
    const url = this.basedUrl +'/'+_name;

    const projectDetails:projectModel = {
      name:name,
      key:key,
      projectLead:projectlead
    }
    const result = this.http.put(url, projectDetails, {withCredentials: true}).subscribe(response=>{
      this.notify.showSuccess(response)
    });
    return result;
  }

  
// Create Projects
  createProject(name:String,key:String,projectlead:String){
    const projectDetails:projectModel = {
      name:name,
      key:key,
      projectLead:projectlead
    }
    this.http.post(this.basedUrl,projectDetails, {withCredentials: true}).subscribe(response=>{
      console.log(response);
      let message:string = JSON.stringify(response);
      if(message.includes("already exist")){
        this.notify.showWarning(message);
      }else{
        this.notify.showSuccess(response);

      }
    });
  }
}
