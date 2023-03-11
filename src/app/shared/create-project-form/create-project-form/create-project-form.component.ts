import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/projects/project.service';
import { Inject } from '@angular/core';

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.scss']
})
export class CreateProjectFormComponent {

  constructor(public dialogref:MatDialogRef<CreateProjectFormComponent>,private projectService:ProjectService,@Inject(MAT_DIALOG_DATA) public data: any){}

name:string = this.data!=null?this.data.name :'';
key:string =  this.data!=null?this.data.key : '';
projectLead:string =   this.data!=null?this.data.projectLead : '';


projectDetails = new FormGroup({
    projectName : new FormControl(this.name,[Validators.required]),
    key : new FormControl(this.key,[Validators.required]),
    projectLead : new FormControl(this.projectLead,[Validators.required]),

  });
  
  onSubmit(){
    if(this.data == null){
      this.projectService.createProject(this.projectDetails.get('projectName')?.value!,this.projectDetails.get('key')?.value!,this.projectDetails.get('projectLead')?.value!);
    }
    else{
      this.projectService.editProject(this.name,this.projectDetails.get('projectName')?.value!,this.projectDetails.get('key')?.value!,this.projectDetails.get('projectLead')?.value!);
    }
    this.dialogref.close();


  }
}
