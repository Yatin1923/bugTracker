import { Component ,OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ReplaySubject, debounceTime, delay, map, tap } from 'rxjs';
import { AuthService } from 'src/app/Auth/auth.service';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { BugService } from '../../bug.service';
@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.scss'],

})
export class BugDetailsComponent {

  constructor( @Inject (MAT_DIALOG_DATA) public data: any,public dialogref:MatDialogRef<BugDetailsComponent>,private authService:AuthService,private bugService:BugService){
    
  }
  users:any;
  projectName:any = this.data.projectName;
  id:any = this.data.bug.id;
  title: any = this.data.bug.title;
  priority:any = this.data.bug.priority;
  assignedTo:any = this.data.bug.assignedTo;
  description:any = this.data.bug.description;
  comments:any = this.data.bug.comments;
  state:any = this.data.bug.status;
  nullUser:any;
  currentTime:any;
  // Form Group
  bugDetails = new FormGroup({
    id:new FormControl(this.id||''),
    title:new FormControl(this.title||''),
    description:new FormControl(this.description||''),
    assignedTo:new FormControl(this.assignedTo||''),
    comments:new FormControl(),
    priority:new FormControl(this.priority||''),
    status:new FormControl(this.state||'')
  })

  descEditorConfig: AngularEditorConfig = {
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
  commentEditorConfig: AngularEditorConfig = {
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
public filteringUsers: FormControl = new FormControl();
public  filteredUsers: ReplaySubject<any[]> = new ReplaySubject<any[]>(1);
public searching: boolean = false;

ngOnInit(){

    this.currentTime = Date();
    this.authService.getUsers().subscribe(async response => {
      this.users = await response;
     });
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

  copyText(text: string){
    navigator.clipboard.writeText(text);
  }
  statusChange(event:any,bug:any){
    bug.status = event.target.value;
  }
  updateBug(){
    console.log(this.bugDetails.value)
    this.bugService.updateBug(this.projectName,this.bugDetails.value).subscribe(()=>{
      this.dialogref.close(this.bugDetails.value);
    });
  }
}
