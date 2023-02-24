import { Component } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from '../../Auth/auth.service';

@Component({
  selector: 'app-sign-up-form',
  templateUrl: './sign-up-form.component.html',
  styleUrls: ['./sign-up-form.component.scss']
})
export class SignUpFormComponent {
  constructor(public dialogref:MatDialogRef<SignUpFormComponent>,public authService:AuthService){}
  // closeDialog(){
  //   this.dialogref.close();
  // }
  signUpDetails = new FormGroup({

  emailFormControl : new FormControl('', [Validators.required,Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")]),
  passwordFormControl : new FormControl('', [Validators.required,Validators.pattern("^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$")]),
  firstNameFormControl : new FormControl(),
  lastNameFormControl : new FormControl()
  
})
  
onSubmit(){
  this.dialogref.close();
  this.authService.CreateUser(this.signUpDetails.get('emailFormControl')?.value!,this.signUpDetails.get('passwordFormControl')?.value!,this.signUpDetails.get('firstNameFormControl')?.value!,this.signUpDetails.get('lastNameFormControl')?.value!)
}
}

