import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import {debounceTime, delay, tap, filter, map, takeUntil} from 'rxjs/operators';
import { AuthService } from 'src/app/Auth/auth.service';
import { BugService } from '../../bug.service';
import { ActivatedRoute } from '@angular/router';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { NotifyService } from 'src/app/shared/notifyService/notify.service';

@Component({
  selector: 'app-create-bug-form',
  templateUrl: './create-bug-form.component.html',
  styleUrls: ['./create-bug-form.component.scss']
})
export class CreateBugFormComponent {
  constructor(private notify:NotifyService, private authService: AuthService,private bugService:BugService,private router:ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,public dialogref:MatDialogRef<CreateBugFormComponent>){}
  
  bugDetails = new FormGroup({
    bugTitle : new FormControl('',[Validators.required]),
    description : new FormControl(''),
  })

  users:any;
  public assignedTo: FormControl = new FormControl(); // assignedTo is outside of form group for simplicity
  public filteringUsers: FormControl = new FormControl();
  public filteredUsers: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  public searching: boolean = false;
  projectName:any;

  // Get Initials of Name
  getInitials(firstname:string, lastname:string){
    return (firstname.charAt(0)+ lastname.charAt(0)).toUpperCase();
  }

  // Get All Users and filter bugs
  ngOnInit() {
    this.projectName = this.data.projectName;
    this.authService.getUsers().subscribe(async response => {
    this.users = await response;
   });

   // listen for search field value changes
   this.filteringUsers.valueChanges
   .pipe(
     tap(() => this.searching = true),
     debounceTime(200),
     map(search => {
       if (!this.users) {
         return [];
        }
          return this.users.filter((user: { firstname: string; lastname:string }) => user.firstname.toLowerCase().indexOf(search) > -1 ||user.lastname.toLowerCase().indexOf(search) > -1 );
        }),
        delay(500)
      )
      .subscribe(filteredUsers => {
        this.searching = false;
        this.filteredUsers.next(filteredUsers);
      });

  }

  // Create bug onSubmit
  onSubmit(){
    let id;
    this.bugService.createBug(this.projectName,this.bugDetails.get('bugTitle')?.value,this.bugDetails.get('description')?.value,this.assignedTo.value).subscribe(res=>{
      if(res.toString().includes("already exists")){
        this.notify.showWarning(res)
      } else{
        this.notify.showSuccess("Bug created successfully")
      }
      id = res;
       console.log(id);
      this.dialogref.close({id:id,title:this.bugDetails.get('bugTitle')?.value,description:this.bugDetails.get('description')?.value,assignedTo:this.assignedTo.value?this.assignedTo.value.firstname +' '+this.assignedTo.value.lastname :"",status:"new"})
    })
  }
}
