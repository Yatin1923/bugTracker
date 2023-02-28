import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';
import { AuthService } from 'src/app/Auth/auth.service';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {
  
  constructor(public dialog: MatDialog,private authService:AuthService,private router:Router) {
  }
  isLoggedIn: any 
  ngOnInit(){
    this.router.events.subscribe(event => {
      if(event instanceof NavigationEnd) {
          this.authService.isAuthenticated().subscribe(response=>{
            this.isLoggedIn = response;
            // console.log(this.isLoggedIn);
          });
      }
    })
  }


  openDialog() {
    // console.log(this.isLoggedIn);
    this.dialog.open(SignUpFormComponent,{
      width:'30%'
    });
  }
  logout(){
    this.router.navigate(['/']);    
    this.authService.logout();
  }
}
