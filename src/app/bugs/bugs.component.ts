import { Component,OnInit,OnDestroy,OnChanges, SimpleChanges } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
import { BugService } from './bug.service';
import { ActivatedRoute } from '@angular/router';
import { response } from 'express';
import { MatDialog } from '@angular/material/dialog';
import { CreateBugFormComponent } from './create-bugs-form/create-bug-form/create-bug-form.component';
@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss']
})
export class BugsComponent {
  bugs:any;
  activeBugs:any = [];
  resolvedBugs:any = [];
  pausedBugs:any = [];
  newBugs:any=[];
  projectName:string;
  constructor(private bugService : BugService,private route: ActivatedRoute,private dialog:MatDialog){}

  dataSource:any;
  // status:any;
  ngOnInit(){
    this.projectName = this.route.snapshot.paramMap.get('projectName')||'';
    this.getBugs();
  }
  deleteBug(bug:any,bugType:String){
    this.bugService.deleteBug(this.projectName,bug._id).subscribe((res)=>{
      if(bugType == 'new'){
        let indexOfBug = this.newBugs.indexOf(bug);
        this.newBugs.splice(indexOfBug,1);        
      }
      if(bugType == 'active'){
        let indexOfBug = this.newBugs.indexOf(bug);
        this.activeBugs.splice(indexOfBug,1);   
      }
      if(bugType == 'resolved'){
        let indexOfBug = this.newBugs.indexOf(bug);
        this.resolvedBugs.splice(indexOfBug,1);   
      }
      if(bugType == 'paused'){
        let indexOfBug = this.newBugs.indexOf(bug);
        this.pausedBugs.splice(indexOfBug,1);   
      }
    });

  }
  openDialog(){
    const dialogref = this.dialog.open(CreateBugFormComponent,{
      width:'30%',data:{
        projectName:this.route.snapshot.paramMap.get('projectName')||''
      }
    })
    dialogref.afterClosed().subscribe((bug)=>{
      if(bug){
        this.newBugs.push(bug);
      }
    }
  )
  }
  editBug(bugId:string,bugTitle:string, bugDescription:string,assignedTo:string){
    const dialogref = this.dialog.open(CreateBugFormComponent,{
      width:'70%',
      data:{
        projectName:this.route.snapshot.paramMap.get('projectName')||'',
        bugId:bugId,
        bugTitle:bugTitle,
        bugDescription:bugDescription,
        assignedTo:assignedTo
      }
    })
  }
  getNewBugs(){

    for (let i = 0; i < this.bugs.length; i++) {
       //console.log(this.bugs)
      if (this.bugs[i].new==true) {
        //console.log("newBugs",this.bugs[i]);
        this.newBugs.push(this.bugs[i]);
      }
    }
    this.sortList(this.newBugs);
  }
  getActiveBugs(){
    for (let i = 0; i < this.bugs.length; i++) {
      if (this.bugs[i].active==true) {
       // console.log("activeBug",this.bugs[i]);
        this.activeBugs.push(this.bugs[i]);
      }
    }
    this.sortList(this.activeBugs);
  }
  getResolvedBugs(){
    for (let i = 0; i < this.bugs.length; i++) {
      if (this.bugs[i].resolved==true) {
       // console.log("resolvedBug",this.bugs[i]);
        this.resolvedBugs.push(this.bugs[i]);
      }
    }
    this.sortList(this.resolvedBugs);
  }
  getPausedBugs(){
    for (let i = 0; i < this.bugs.length; i++) {
      if (this.bugs[i].paused==true) {
        //console.log("pausedBug",this.bugs[i]);
        this.pausedBugs.push(this.bugs[i]);
    }
  }
  this.sortList(this.pausedBugs);;
}
  getBugs(){
    this.bugService.getBugs(this.route.snapshot.paramMap.get('projectName')||'').subscribe(response=>{
      this.bugs = response;
    // console.log(this.bugs)

      this.getNewBugs();
      this.getActiveBugs();
      this.getResolvedBugs();
      this.getPausedBugs();
    });
  }
  sortList(list:any[]){
    list.sort((a: { title: string; }, b: { title: string; }) => {
      let fa = a.title.toLowerCase(),
          fb = b.title.toLowerCase();
  
      if (fa < fb) {
          return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;
  });
  }
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }


  previousStatus:any;
  previousOption(event:any){
    this.previousStatus = event.target.value;
  }

  getCurrentContainer(name:string){
    switch(name){
      case "new":{
        return this.newBugs;
      }
      case "active":{
        return this.activeBugs;
      }
      case "resolved":{
        return this.resolvedBugs;
      }
      case "paused":{
        return this.pausedBugs;
      }
    }
  }
optionChange(event:any,previousIndex:any,previousContainer:any){
  console.log(event.target.value);
  console.log(previousIndex);
  

  transferArrayItem(previousContainer,this.getCurrentContainer(event.target.value),previousIndex,0);

  switch(event.target.value){
    case "new":{
      let updatedBug:any;
      this.newBugs.forEach(function(value: any){
        if(value.new == false){
          updatedBug =value;
          value.active = false;
          value.new = true;
          value.resolved = false;
          value.paused = false;
        }
      })
      console.log("new",updatedBug)
      this.bugService.updateBug(this.route.snapshot.paramMap.get('projectName')||'',updatedBug);
      this.sortList(this.newBugs);
      break;
    }
    case "active":{
      let updatedBug:any;
      this.activeBugs.forEach(function(value: any){
        if(value.active == false){
          updatedBug =value;
          value.active = true;
          value.new = false;
          value.resolved = false;
          value.paused = false;
        }
      })
      console.log("active",updatedBug)
      this.bugService.updateBug(this.route.snapshot.paramMap.get('projectName')||'',updatedBug);
      this.sortList(this.activeBugs);
      break;
    }
    case "resolved":{
      let updatedBug:any;
      this.resolvedBugs.forEach(function(value: any){
        if(value.resolved == false){
          updatedBug =value;
          value.active = false;
          value.new = false;
          value.resolved = true;
          value.paused = false;
        }
      })
      console.log("resolved",updatedBug)
      this.bugService.updateBug(this.route.snapshot.paramMap.get('projectName')||'',updatedBug);
      this.sortList(this.resolvedBugs);
      break;
    }
    case "paused":{  
      let updatedBug:any;
      this.pausedBugs.forEach(function(value: any){
        if(value.paused == false){
          updatedBug =value;
          value.active = false;
          value.new = false;
          value.resolved = false;
          value.paused = true;
        }
      })
      console.log("paused",updatedBug)
      this.bugService.updateBug(this.route.snapshot.paramMap.get('projectName')||'',updatedBug);
      this.sortList(this.pausedBugs);
      break;
    }
}
}
  drop(event: CdkDragDrop<any[]>) {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
      switch(event.container.id){
        case "new":{
          let updatedBug:any;
          this.newBugs.forEach(function(value: any){
            if(value.new == false){
              updatedBug =value;
              value.active = false;
              value.new = true;
              value.resolved = false;
              value.paused = false;
            }
          })
          // console.log("new",updatedBug)
          this.bugService.updateBug(this.route.snapshot.paramMap.get('projectName')||'',updatedBug);
          this.sortList(this.newBugs);
          break;
        }
        case "active":{
          let updatedBug:any;
          this.activeBugs.forEach(function(value: any){
            if(value.active == false){
              updatedBug =value;
              value.active = true;
              value.new = false;
              value.resolved = false;
              value.paused = false;
            }
          })
          // console.log("active",updatedBug)
          this.bugService.updateBug(this.route.snapshot.paramMap.get('projectName')||'',updatedBug);
          this.sortList(this.activeBugs);
          break;
        }
        case "resolved":{
          let updatedBug:any;
          this.resolvedBugs.forEach(function(value: any){
            if(value.resolved == false){
              updatedBug =value;
              value.active = false;
              value.new = false;
              value.resolved = true;
              value.paused = false;
            }
          })
          console.log("resolved",updatedBug)
          this.bugService.updateBug(this.route.snapshot.paramMap.get('projectName')||'',updatedBug);
          this.sortList(this.resolvedBugs);
          break;
        }
        case "paused":{  
          let updatedBug:any;
          this.pausedBugs.forEach(function(value: any){
            if(value.paused == false){
              updatedBug =value;
              value.active = false;
              value.new = false;
              value.resolved = false;
              value.paused = true;
            }
          })
          console.log("paused",updatedBug)
          this.bugService.updateBug(this.route.snapshot.paramMap.get('projectName')||'',updatedBug);
          this.sortList(this.pausedBugs);
          break;
        }
    }
  }
}
