import { SocialAuthService } from '@abacritt/angularx-social-login';
import {Component, HostListener,OnInit,AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { AuthService } from '../Auth/auth.service';
import { SignUpFormComponent } from '../shared/sign-up-form/sign-up-form.component';



@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {
  user: any;
  loggedIn: any;
  loginCard:boolean = false
  observer:IntersectionObserver;
  constructor(public dialog: MatDialog,private socialAuthService:SocialAuthService, private authService:AuthService) {}
  loginCredentials = new FormGroup(
    {
      emailFormControl : new FormControl(),
      passwordFormControl :new FormControl()
    }
  )
  ngAfterViewInit() {
    const slideLeft = document.querySelectorAll('.slideLeft');
    const slideRight = document.querySelectorAll('.slideRight');
    const fadeIn = document.querySelectorAll('.fadeIn');
    console.log(slideLeft);

    this.observer = new IntersectionObserver((entries) => {
      
      entries.forEach((entry) => {
        if(entry.isIntersecting) {
          
          entry.target.classList.add('slideComplete')
          entry.target.classList.add('fadeOut')
        }else{
          if(entry.boundingClientRect.y>0){
            entry.target.classList.remove('slideComplete')
            entry.target.classList.remove('fadeOut')
          }

        }
      });
    },{threshold:0.5,rootMargin:'0%'});

    slideLeft.forEach(element=>{
      this.observer.observe(element);
    })
    slideRight.forEach(element=>{
      this.observer.observe(element);
    })
    fadeIn.forEach(element=>{
      this.observer.observe(element);
    })
  }
  ngOnInit(){
    this.socialAuthService.
    authState.subscribe((user)=>{
      this.user = user;
      this.loggedIn = (user!=null)

      
      // console.log(user);
    })
  }

  onLogin(){
    this.authService.loginUser(this.loginCredentials.get('emailFormControl')?.value,this.loginCredentials.get('passwordFormControl')?.value)
    this.loginCredentials.reset();
  }
  openDialog() {
    this.dialog.open(SignUpFormComponent,{
      width:'30%'
    });
  }






// Removed because it causes lack of performance by calling function on every scroll



  // @HostListener('window:scroll')
  //  animations() {
  //   console.log("animations")
  //    var elementVisible = 100;
  //    var slideLeft = document.querySelectorAll(".slideLeft");
  //    for (var i = 0; i < slideLeft.length; i++) {
  //      var windowHeight = window.innerHeight;
  //      var elementTop = slideLeft[i].getBoundingClientRect().top;
       
  //      if (elementTop < windowHeight - elementVisible) {
  //        slideLeft[i].classList.add("slideComplete");
  //       } else {
  //         slideLeft[i].classList.remove("slideComplete");
  //       }
  //     }
  //     var slideRight = document.querySelectorAll(".slideRight");
  //    for (var i = 0; i < slideRight.length; i++) {
  //      var windowHeight = window.innerHeight;
  //      var elementTop = slideRight[i].getBoundingClientRect().top;
       
  //      if (elementTop < windowHeight - elementVisible) {
  //       slideRight[i].classList.add("slideComplete");
  //       } else {
  //         slideRight[i].classList.remove("slideComplete");
  //       }
  //     }
  //   var fadeIn = document.querySelectorAll(".fadeIn");
  //   for (var i = 0; i < fadeIn.length; i++) {
  //     var windowHeight = window.innerHeight;
  //     var elementTop = fadeIn[i].getBoundingClientRect().top;  
  //     if (elementTop < windowHeight - elementVisible) {
  //       fadeIn[i].classList.add("fadeOut");
  //     } else {
  //       fadeIn[i].classList.remove("fadeOut");
  //     }
  //   }
  // }


}


