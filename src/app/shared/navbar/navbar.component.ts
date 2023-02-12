import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SignUpFormComponent } from '../sign-up-form/sign-up-form.component';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  constructor(public dialog: MatDialog) {}
  
  openDialog() {
    this.dialog.open(SignUpFormComponent,{
      width:'30%'
    });
  }
}
