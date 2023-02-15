import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ProjectService } from 'src/app/projects/project.service';

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.scss']
})
export class CreateProjectFormComponent {

  constructor(public dialogref:MatDialogRef<CreateProjectFormComponent>,private projectService:ProjectService){}
  // closeDialog(){
  //   this.dialogref.close();
  // }
  projectDetails = new FormGroup({
    projectName : new FormControl('',[Validators.required]),
    key : new FormControl('',[Validators.required]),
    projectLead : new FormControl('',[Validators.required]),

  });

  onSubmit(){
    console.log("inside onSubmit");
    this.projectService.createProject(this.projectDetails.get('projectName')?.value!,this.projectDetails.get('key')?.value!,this.projectDetails.get('projectLead')?.value!);
    this.dialogref.close();


  }
}
