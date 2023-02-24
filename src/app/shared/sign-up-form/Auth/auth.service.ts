import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router  } from '@angular/router';
import { response } from 'express';
import { AuthData } from './auth-data.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basedUrl:string = "http://localhost:3000/user/signup"
  loginUrl:string = "http://localhost:3000/user/login"
  
  constructor(private http: HttpClient,private router: Router){}
 
 
  CreateUser(email:string,password:string, firstname:string,lastname:string){
    const authData:AuthData = {
      email: email, password: password, firstname: firstname, lastname: lastname
    }
    this.http.post(this.basedUrl,authData).subscribe(response=>{
      console.log(response);
    })
  }
  
  loginUser(email:string,password:string){
    this.http.post(this.loginUrl,{email:email,password:password}).subscribe({
      next: (response) => {
        console.log(response);
        if(response == true){
          setTimeout(()=>{
            this.router.navigate(['/projects']);

          },10000)
        }
      },
      error: (error) => {
        console.log(error.status);
        if(error.status){
          alert("Incorrect username or password");
        }
      }
    });
  }


}


