import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { response } from 'express';
import { projectModel } from './project.model';
@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  basedUrl:string = "http://localhost:3000/projects"
  constructor(private http: HttpClient) { }

  createProject(name:String,key:String,projectlead:String){
    const projectDetails:projectModel = {
      name:name,
      key:key,
      projectLead:projectlead
    }
    console.log("inside createProject: "+projectDetails);
    this.http.post(this.basedUrl,projectDetails).subscribe(response=>{
      console.log(response);
    });
  }
}
