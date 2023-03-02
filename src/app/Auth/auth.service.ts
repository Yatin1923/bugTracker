import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable ,OnInit} from '@angular/core';
import { Router  } from '@angular/router';
import { response } from 'express';
import { take } from 'rxjs';
import { AuthData } from './auth-data.model';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  basedUrl:string = "http://localhost:3000/user"
  
  constructor(private http: HttpClient,private router: Router){}
  
  logout() {
    this.http.post(this.basedUrl+'/logout','',{withCredentials:true}).subscribe();
}
  CreateUser(email:string,password:string, firstname:string,lastname:string){
    const authData:AuthData = {
      email: email, password: password, firstname: firstname, lastname: lastname
    }
    this.http.post(this.basedUrl+'/signup',authData).subscribe(response=>{
    })
  }
  
  loginUser(email:string,password:string){
   return new Promise((resolve,reject)=>{

     this.http.post(this.basedUrl+'/login',{email:email,password:password},{withCredentials:true}).subscribe({
       next: (response) => {
         if(response){
           this.router.navigate(['/projects']);
          }
        },
        error: (error) => {
          
          resolve("Incorrect username or password");
          
        }
      });
    }) 
  }

  isAuthenticated() {
   return this.http.get(this.basedUrl,{withCredentials:true})
}
}


