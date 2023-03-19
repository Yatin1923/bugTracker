import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ReplaySubject, Subject } from 'rxjs';
import {debounceTime, delay, tap, filter, map, takeUntil} from 'rxjs/operators';
import { AuthService } from 'src/app/Auth/auth.service';

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

  constructor(private authService: AuthService){}
  users:any;
  public bugServerSideCtrl: FormControl = new FormControl();
  public bugServerSideFilteringCtrl: FormControl = new FormControl();
  public  filteredServerSidebugs: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);

  public searching: boolean = false;
  protected _onDestroy = new Subject<void>();
  ngOnInit() {
   this.authService.getUsers().subscribe(async response => {
    this.users = await response;
    //console.log(response);
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
          const result = this.users.filter((user: { firstname: string;lastname:string }) => user.firstname.toLowerCase().indexOf(search) > -1 ||user.lastname.toLowerCase().indexOf(search) > -1 )
          const final_result = result.map((x: { firstname: any; })=>x.firstname)
          console.log(final_result);
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

  }
}
