import { Component,OnInit,OnDestroy,OnChanges, SimpleChanges } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BugService } from './bug.service';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { CreateBugFormComponent } from './create-bugs-form/create-bug-form/create-bug-form.component';
import { BugDetailsComponent } from './bugDetails/bug-details/bug-details.component';
import {ViewEncapsulation} from '@angular/core';
@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss'],
  encapsulation: ViewEncapsulation.None 
})
export class BugsComponent {
  bugs:any;
  projectName:string;
  filteredBugs: any;
  totalbugs:any;
  constructor(private bugService : BugService,private route: ActivatedRoute,private dialog:MatDialog){}


  // get project and projectname on init
  ngOnInit(){
    this.projectName = this.route.snapshot.paramMap.get('projectName')||'';
    this.getBugs();
  }


// Delete bug
  deleteBug(bug:any,bugType:String){
    this.bugService.deleteBug(this.projectName,bug.id).subscribe((res)=>{
        let indexOfBug = this.bugs.indexOf(bug);
        this.bugs.splice(indexOfBug,1);   
    });

  }

  // Create bug
  createBug(){
    const dialogref = this.dialog.open(CreateBugFormComponent,{panelClass:"custom-dialog-container",
      width:'30%',data:{
        projectName:this.route.snapshot.paramMap.get('projectName')||''
      }
    })
    dialogref.afterClosed().subscribe((bug)=>{
      if(bug){
        this.bugs.push(bug);
      }
    }
  )
  }
  // Get all bugs
  getBugs(){
    this.bugService.getBugs(this.route.snapshot.paramMap.get('projectName')||'').subscribe(response=>{
      this.bugs = response;
      this.totalbugs = response;
    });
  }

// Open bug Detail Component
  bugDetails(bug:any){
    const dialogref = this.dialog.open(BugDetailsComponent,{
      width:'100%',
      height:'80%',
      data:{
        projectName:this.route.snapshot.paramMap.get('projectName')||'',
        bug:bug
      }
    })
  }


 



// Filter bugs
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.bugs = this.totalbugs;
    this.filteredBugs = this.bugs.filter((x: { id: any; title:any;assignedTo:any;})=>x.id.toString().toLowerCase().indexOf(filterValue) > -1 || x.title.toString().toLowerCase().indexOf(filterValue) >-1 || x.assignedTo.toString().toLowerCase().indexOf(filterValue)>-1)
    if(!(filterValue == undefined || filterValue == null || filterValue == "")){
      this.bugs = this.filteredBugs
    }
    else{
      this.bugs = this.totalbugs;
    }
    
  }



// Update priority of bug
  priorityUpdate(event:any,bug:any){
    console.log("priorityUpdate",event.target.value,bug);
    bug.priority = event.target.value;
    this.bugService.updateBug(this.route.snapshot.paramMap.get('projectName')||'',bug);
  }



  // Change status of bug (by select option)
statusChange(event:any,bug:any){
    bug.status = event.target.value;
    console.log("optionChange",bug);
    this.bugService.updateBug(this.route.snapshot.paramMap.get('projectName')||'',bug);
}


  // Change status of bug (by drag and drop)
  drop(event: CdkDragDrop<any[]>) {
      transferArrayItem(event.previousContainer.data,event.container.data,event.previousIndex,event.currentIndex);
        switch(event.container.id){
        case "new":{
          let updatedBug:any = event.previousContainer.data.filter(x=>x.status == event.previousContainer.id)[event.previousIndex];
          updatedBug.status = "new";
          this.bugService.updateBug(this.route.snapshot.paramMap.get('projectName')||'',updatedBug);
          break;
        }
        case "active":{
          let updatedBug:any = event.previousContainer.data.filter(x=>x.status == event.previousContainer.id)[event.previousIndex];
          console.log(event.previousContainer.data.filter(x=>x.status == event.previousContainer.id)[event.previousIndex]);
          updatedBug.status = "active";
          this.bugService.updateBug(this.route.snapshot.paramMap.get('projectName')||'',updatedBug);
          break;
        }
        case "resolved":{
          let updatedBug:any = event.previousContainer.data.filter(x=>x.status == event.previousContainer.id)[event.previousIndex];
          updatedBug.status = "resolved"
          this.bugService.updateBug(this.route.snapshot.paramMap.get('projectName')||'',updatedBug);
          break;
        }
        case "paused":{  
          let updatedBug:any = event.previousContainer.data.filter(x=>x.status == event.previousContainer.id)[event.previousIndex];
          updatedBug.status = "paused";
          this.bugService.updateBug(this.route.snapshot.paramMap.get('projectName')||'',updatedBug);
          break;
        }
      }
    }
}
  