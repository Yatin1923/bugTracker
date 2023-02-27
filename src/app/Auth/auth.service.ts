import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable ,OnInit} from '@angular/core';
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
  //isLoggedIn:boolean;

  CreateUser(email:string,password:string, firstname:string,lastname:string){
    const authData:AuthData = {
      email: email, password: password, firstname: firstname, lastname: lastname
    }
    this.http.post(this.basedUrl,authData).subscribe(response=>{
      console.log(response);
    })
  }
  
  loginUser(email:string,password:string){
    this.http.post(this.loginUrl,{email:email,password:password},{withCredentials:true}).subscribe({
      next: (response) => {
        console.log(response);
        if(response == true){
          localStorage.setItem('isLoggedIn',"true");
          sessionStorage.setItem('isLoggedIn',"true");
          this.router.navigate(['/projects']);
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

  isAuthenticated() {
    const localLogin = localStorage.getItem("isLoggedIn");
    const sessionLogin = sessionStorage.getItem("isLoggedIn");
    return sessionLogin || localLogin
  }


}


