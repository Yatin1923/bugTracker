import {Component, Inject} from '@angular/core';
import {MatDialog, MatDialogRef} from '@angular/material/dialog';


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
  animal: string | undefined;
  name: string | undefined;

  constructor(public dialog: MatDialog) {}

  openDialog() {
    this.dialog.open(signUpDialog);
  }
}

@Component({
  selector: 'signUpDialog',
  templateUrl: './signUpDialog.html',
})
export class signUpDialog {

  constructor(public dialogref:MatDialogRef<signUpDialog>){}
  closeDialog(){
    this.dialogref.close();
  }
}

