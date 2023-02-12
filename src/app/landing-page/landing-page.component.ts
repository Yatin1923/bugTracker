import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';
import { SignUpFormComponent } from '../shared/sign-up-form/sign-up-form.component';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent {

  constructor(public dialog: MatDialog) {}
  openDialog() {
    this.dialog.open(SignUpFormComponent,{
      width:'30%'
    });
  }
}


