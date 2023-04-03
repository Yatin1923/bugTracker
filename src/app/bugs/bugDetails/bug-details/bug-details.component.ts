import { Component ,OnInit} from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Inject } from '@angular/core';
@Component({
  selector: 'app-bug-details',
  templateUrl: './bug-details.component.html',
  styleUrls: ['./bug-details.component.scss']
})
export class BugDetailsComponent {

  constructor( @Inject (MAT_DIALOG_DATA) public data: any,public dialogref:MatDialogRef<BugDetailsComponent>){
    
  }
  id:any = this.data.bug.id;
  title: any = this.data.bug.title;
  description:any = this.data.bug.description;
  ngOnInit(){
  }
}
