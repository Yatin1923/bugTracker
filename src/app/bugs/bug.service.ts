import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BugService {
basedUrl:string = "http://localhost:3000/projects";

  constructor(private http : HttpClient) { }


  getBugs(projectName:string){
    const result = this.http.get(this.basedUrl+'/'+projectName+'/bugs', {withCredentials: true});
    return result;
  }
  updateBug(projectName:string,bug:any){
    const result = this.http.put(this.basedUrl+'/'+projectName+'/bugs/'+bug._id,bug, {withCredentials:true}).subscribe();
  }
}

