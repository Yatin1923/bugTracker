import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';
import { AuthService } from 'src/app/Auth/auth.service';
import { Router } from '@angular/router';

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
      if(event.constructor.name === 'NavigationEnd') {
        this.isLoggedIn = this.authService.isAuthenticated();
      }
      if(this.isLoggedIn == null){
        this.isLoggedIn = false;
      }
    })
  }


  openDialog() {
    console.log(this.isLoggedIn);
    this.dialog.open(SignUpFormComponent,{
      width:'30%'
    });
  }
}
