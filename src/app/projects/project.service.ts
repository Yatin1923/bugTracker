import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { projectModel } from './project.model';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  basedUrl:string = "http://localhost:3000/projects"
  constructor(private http: HttpClient) { }

  getProject(){
    const result = this.http.get(this.basedUrl, {withCredentials: true});
    return result;
  }
  deleteProject(name:String){
    const url = this.basedUrl +'/'+name;
    const result = this.http.delete(url, {withCredentials: true})
    return result;
  }
  
  editProject(_name:string,name:String,key:String,projectlead:String){
    // console.log("editProject: ",_name)
    const url = this.basedUrl +'/'+_name;

    const projectDetails:projectModel = {
      name:name,
      key:key,
      projectLead:projectlead
    }
    const result = this.http.put(url, projectDetails, {withCredentials: true}).subscribe();
    return result;
  }

  createProject(name:String,key:String,projectlead:String){
    const projectDetails:projectModel = {
      name:name,
      key:key,
      projectLead:projectlead
    }
    this.http.post(this.basedUrl,projectDetails, {withCredentials: true}).subscribe(response=>{
    });
  }
}
