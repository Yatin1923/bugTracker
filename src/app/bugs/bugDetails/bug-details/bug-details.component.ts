import { Component ,OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { ReplaySubject, Subject, debounceTime, delay, filter, map, takeUntil, tap } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.scss'],

})
export class BugDetailsComponent {

  constructor( @Inject (MAT_DIALOG_DATA) public data: any,public dialogref:MatDialogRef<BugDetailsComponent>,private authService:AuthService){
    
  }
  users:any;
  id:any = this.data.bug.id;
  title: any = this.data.bug.title;
  priority:any = this.data.bug.priority;
  assignedTo:any = this.data.bug.assignedTo;
  description:any = this.data.bug.description;

  editorConfig: AngularEditorConfig = {
    outline:false,
    editable: true,
      spellcheck: true,
      height: 'auto',
      minHeight: '400px',
      maxHeight: 'auto',
      width: 'auto',
      translate: 'yes',
      enableToolbar: true,
      showToolbar: false,
      placeholder: 'Enter text here...',
      defaultParagraphSeparator: '',
      defaultFontName: '',
      defaultFontSize: '',
      fonts: [
        {class: 'arial', name: 'Arial'},
        {class: 'times-new-roman', name: 'Times New Roman'},
        {class: 'calibri', name: 'Calibri'},
        {class: 'comic-sans-ms', name: 'Comic Sans MS'}
      ],
      toolbarPosition:'bottom',
      toolbarHiddenButtons: [
        [
          'undo',
          'redo',
          'strikeThrough',
          'subscript',
          'superscript',
          'justifyLeft',
          'justifyCenter',
          'justifyRight',
          'justifyFull',
          'fontName'
        ],
        [
          'fontSize',
          'customClasses',
          'link',
          'unlink',
          'insertVideo',
          'removeFormat',
          'toggleEditorMode'
        ]
      ]
      
};

public bugServerSideCtrl: FormControl = new FormControl();
public bugServerSideFilteringCtrl: FormControl = new FormControl();
public  filteredServerSidebugs: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
public searching: boolean = false;
protected _onDestroy = new Subject<void>();

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
}
