import {Component, HostListener, } from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SignUpFormComponent } from '../shared/sign-up-form/sign-up-form.component';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
})
export class LandingPageComponent {

  constructor(public dialog: MatDialog) {}


  openDialog() {
    this.dialog.open(SignUpFormComponent,{
      width:'30%'
    });
  }
  @HostListener('window:scroll')
   animations() {
     var elementVisible = 100;
     var slideLeft = document.querySelectorAll(".slideLeft");
     for (var i = 0; i < slideLeft.length; i++) {
       var windowHeight = window.innerHeight;
       var elementTop = slideLeft[i].getBoundingClientRect().top;
       
       if (elementTop < windowHeight - elementVisible) {
         slideLeft[i].classList.add("slideComplete");
        } else {
          // slideLeft[i].classList.remove("slideComplete");
        }
      }
      var slideRight = document.querySelectorAll(".slideRight");
     for (var i = 0; i < slideRight.length; i++) {
       var windowHeight = window.innerHeight;
       var elementTop = slideRight[i].getBoundingClientRect().top;
       
       if (elementTop < windowHeight - elementVisible) {
        slideRight[i].classList.add("slideComplete");
        } else {
          // slideRight[i].classList.remove("slideComplete");
        }
      }
    var fadeIn = document.querySelectorAll(".fadeIn");
    for (var i = 0; i < fadeIn.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = fadeIn[i].getBoundingClientRect().top;  
      if (elementTop < windowHeight - elementVisible) {
        fadeIn[i].classList.add("fadeOut");
      } else {
        // fadeIn[i].classList.remove("fadeOut");
      }
    }
  }


}


