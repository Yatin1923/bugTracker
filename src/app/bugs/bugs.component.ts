import { Component } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';
@Component({
  selector: 'app-bugs',
  templateUrl: './bugs.component.html',
  styleUrls: ['./bugs.component.scss']
})
export class BugsComponent {
  new = [{id:1,title:'Get to work'}, {id:2,title:'Pick up groceries'}, {id:3,title:'Go home'}, {id:4,title:'Fall asleep'}];

  active = [{id:1,title:'Get to work'}, {id:2,title:'Pick up groceries'}, {id:3,title:'Go home'}, {id:4,title:'Fall asleep'}];
  
  resolved = [{id:1,title:'Get to work'}, {id:2,title:'Pick up groceries'}, {id:3,title:'Go home'}, {id:4,title:'Fall asleep'}];
  
  paused = [{id:1,title:'Get to work'}, {id:2,title:'Pick up groceries'}, {id:3,title:'Go home'}, {id:4,title:'Fall asleep'}];

  dataSource:any;


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
