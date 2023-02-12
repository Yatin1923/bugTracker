import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthData } from './auth-data.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basedUrl:string = "http://localhost:3000/user/signup"
  
  
  constructor(private http: HttpClient){}
 
 
  CreateUser(email:string,password:string, firstname:string,lastname:string){
    const authData:AuthData = {email:email,password:password,firstname:firstname,lastname:lastname}
    this.http.post(this.basedUrl,authData).subscribe(response=>{
      console.log(response);
    })
  }


}


