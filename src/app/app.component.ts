import { Component,OnInit,OnDestroy } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  ngOnDestroy(){
    localStorage.removeItem('isLoggedIn');
   }
   constructor(){
    window.onbeforeunload = ()=>{
      localStorage.removeItem('isLoggedIn');
    }
   }
  title = 'bugTracker';
}
