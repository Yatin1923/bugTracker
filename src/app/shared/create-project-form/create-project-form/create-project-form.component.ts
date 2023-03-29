import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef,MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProjectService } from 'src/app/projects/project.service';
import { Inject } from '@angular/core';
import { debounceTime, delay, filter, map, ReplaySubject, Subject, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';

@Component({
  selector: 'app-create-project-form',
  templateUrl: './create-project-form.component.html',
  styleUrls: ['./create-project-form.component.scss']
})
export class CreateProjectFormComponent {

  constructor(public dialogref:MatDialogRef<CreateProjectFormComponent>,private projectService:ProjectService,@Inject(MAT_DIALOG_DATA) public data: any,private authService:AuthService){}

  users:any;
  public bugServerSideCtrl: FormControl = new FormControl();
  public bugServerSideFilteringCtrl: FormControl = new FormControl();
  public  filteredServerSidebugs: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  public searching: boolean = false;
  protected _onDestroy = new Subject<void>();
  projectName:any;


name:string = this.data!=null?this.data.name :'';
key:string =  this.data!=null?this.data.key : '';
projectLead:string =   this.data!=null?this.data.projectLead : '';


projectDetails = new FormGroup({
    projectName : new FormControl(this.name,[Validators.required]),
    key : new FormControl(this.key,[Validators.required]),
    projectLead : new FormControl(this.projectLead,[Validators.required]),

  });
  getInitials(firstname:string, lastname:string){
    return (firstname.charAt(0)+ lastname.charAt(0)).toUpperCase();
  }
  ngOnInit(){
    this.authService.getUsers().subscribe(async response => {
      this.users = await response;
     });

    this.bugServerSideFilteringCtrl.valueChanges
   .pipe(
     filter(search => search),
     tap(() => this.searching = true),
     takeUntil(this._onDestroy),
     debounceTime(200),
     map(search => {
       if (!this.users) {
         return [];
        }
        
        console.log(this.users.filter((user: { firstname: string;lastname:string }) => user.firstname.toLowerCase().indexOf(search) > -1 ||user.lastname.toLowerCase().indexOf(search) > -1 ));
          // simulate server fetching and filtering data
          return this.users.filter((user: { firstname: string;lastname:string }) => user.firstname.toLowerCase().indexOf(search) > -1 ||user.lastname.toLowerCase().indexOf(search) > -1 );
        }),
        delay(500)
      )
      .subscribe(filteredbugs => {
        this.searching = false;
        this.filteredServerSidebugs.next(filteredbugs);
      },
        error => {
          // no errors in our simulated example
          this.searching = false;
          // handle error...
        });
  }
  onSubmit(){
    if(this.data == null){
      this.projectService.createProject(this.projectDetails.get('projectName')?.value!,this.projectDetails.get('key')?.value!,this.projectDetails.get('projectLead')?.value!);
    }
    else{
      let projectLead = this.projectDetails.get('projectLead')?.value
      console.log(projectLead);
      this.projectService.editProject(this.name,this.projectDetails.get('projectName')?.value!,this.projectDetails.get('key')?.value!,this.projectDetails.get('projectLead')?.value!);
    }
    this.dialogref.close();


  }
}
