import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BugService {
basedUrl:string = "http://localhost:3000/projects";

  constructor(private http : HttpClient) { }

  createBug(projectName:string,bugTitle:any,bugDescription:any,assignedTo:any){
    //console.log(projectName);
    const result = this.http.post(this.basedUrl+'/'+projectName+'/bugs',{title:bugTitle,description:bugDescription,assignedTo:assignedTo?assignedTo.firstname +' '+ assignedTo.lastname:'',new:true},{withCredentials:true})
   // console.log(result)
    return result
  }
  getBugs(projectName:string){
    const result = this.http.get(this.basedUrl+'/'+projectName+'/bugs', {withCredentials: true});
    return result;
  }
  updateBug(projectName:string,bug:any){
    const result = this.http.put(this.basedUrl+'/'+projectName+'/bugs/'+bug._id,bug, {withCredentials:true}).subscribe();
  }
  deleteBug(projectName:string,bugId:string){
    //console.log("delete called")
    const result = this.http.delete(this.basedUrl+'/'+projectName+'/bugs'+'/'+bugId,{withCredentials:true});
    return result;
  }
}

