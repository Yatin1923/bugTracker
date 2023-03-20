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

@Component({
  selector: 'app-create-bug-form',
  templateUrl: './create-bug-form.component.html',
  styleUrls: ['./create-bug-form.component.scss']
})
export class CreateBugFormComponent {
  bugDetails = new FormGroup({
    bugTitle : new FormControl('',[Validators.required]),
    description : new FormControl(''),

  })

  constructor(private authService: AuthService,private bugService:BugService,private router:ActivatedRoute, @Inject(MAT_DIALOG_DATA) public data: any,public dialogref:MatDialogRef<CreateBugFormComponent>){}
  users:any;
  public bugServerSideCtrl: FormControl = new FormControl();
  public bugServerSideFilteringCtrl: FormControl = new FormControl();
  public  filteredServerSidebugs: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  public searching: boolean = false;
  protected _onDestroy = new Subject<void>();
  projectName:any;

  getInitials(firstname:string, lastname:string){
    return (firstname.charAt(0)+ lastname.charAt(0)).toUpperCase();
  }
  ngOnInit() {
    this.projectName = this.data.projectName;
   this.authService.getUsers().subscribe(async response => {
    this.users = await response;
   });
   // listen for search field value changes
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
    this.bugService.createBug(this.projectName,this.bugDetails.get('bugTitle')?.value,this.bugDetails.get('description')?.value,this.bugServerSideCtrl.value).subscribe(res=>{
    })
    this.dialogref.close();
  }
}