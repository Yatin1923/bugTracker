import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BugService {
basedUrl:string = "http://localhost:3000/projects";

  constructor(private http : HttpClient) { }

  // Create bug
  createBug(projectName:string,bugTitle:any,bugDescription:any,assignedTo:any){
    const result = this.http.post(this.basedUrl+'/'+projectName+'/bugs',{title:bugTitle,description:bugDescription,assignedTo:assignedTo?assignedTo.firstname +' '+ assignedTo.lastname:'',status:"new"},{withCredentials:true})
    return result
  }

  // Get all bugs
  getBugs(projectName:string){
    const result = this.http.get(this.basedUrl+'/'+projectName+'/bugs', {withCredentials: true});
    return result;
  }

  // Update bug
  updateBug(projectName:string,bug:any){
    const result = this.http.put(this.basedUrl+'/'+projectName+'/bugs/'+bug.id,bug, {withCredentials:true});
    return result;
  }

  // Delete bug
  deleteBug(projectName:string,bugId:string){
    const result = this.http.delete(this.basedUrl+'/'+projectName+'/bugs'+'/'+bugId,{withCredentials:true});
    return result;
  }
}

