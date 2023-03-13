import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss']
})
export class BugsComponent {
  new = [{id:1,title:'Get to work',assignedTo:'Yatin'}, {id:2,title:'Pick up groceries',assignedTo:'Yatin'}, {id:3,title:'Go home',assignedTo:'Yatin'}, {id:4,title:'Fall asleep',assignedTo:'Yatin'}];

  active = [{id:1,title:'Get to work',assignedTo:'Yatin'}, {id:2,title:'Pick up groceries',assignedTo:'Yatin'}, {id:3,title:'Go home',assignedTo:'Yatin'}, {id:4,title:'Fall asleep',assignedTo:'Yatin'}];
  
  resolved = [{id:1,title:'Get to work',assignedTo:'Yatin'}, {id:2,title:'Pick up groceries',assignedTo:'Yatin'}, {id:3,title:'Go home',assignedTo:'Yatin'}, {id:4,title:'Fall asleep',assignedTo:'Yatin'}];
  
  paused = [{id:1,title:'Get to work',assignedTo:'Yatin'}, {id:2,title:'Pick up groceries',assignedTo:'Yatin'}, {id:3,title:'Go home',assignedTo:'Yatin'}, {id:4,title:'Fall asleep',assignedTo:'Yatin'}];

  dataSource:any;

  status = ["New","Active","Resolved","Paused"];
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  createBug(){}
  drop(event: CdkDragDrop<any[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }
}
