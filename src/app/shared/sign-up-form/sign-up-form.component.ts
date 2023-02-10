import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent {
  constructor(public dialogref:MatDialogRef<SignUpFormComponent>){}
  closeDialog(){
    this.dialogref.close();
  }
  signUpDetails = new FormGroup({

  emailFormControl : new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  passwordFormControl : new FormControl('', [Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
  firstNameFormControl : new FormControl()
  
})
lastNameFormControl = new FormControl()
  
onSubmit(){
  this.dialogref.close();
  alert('Welcome ' + this.signUpDetails.get('firstNameFormControl')?.value);
}
}

