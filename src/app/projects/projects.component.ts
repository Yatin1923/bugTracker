import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CreateProjectFormComponent } from '../shared/create-project-form/create-project-form/create-project-form.component';
import { ProjectService } from './project.service';
import { rowsAnimation, rowUpdate } from './rowAnimation/animation';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss'],
  animations: [rowsAnimation,rowUpdate]
})
export class ProjectsComponent {

  constructor(private projectService:ProjectService,private dialog:MatDialog){}

  dataSource: MatTableDataSource<any>;
  ngOnInit(){
    this.getProjects();
  }

  
  openDialog(){
    const dialogref = this.dialog.open(CreateProjectFormComponent,{
      width:'30%',
    })
    dialogref.afterClosed().subscribe(()=>
      this.getProjects()
    )
  }

  getProjects(){
    this.projectService.getProject().subscribe((data:any)=>{
      this.dataSource = new MatTableDataSource(data);
    })
  }

  editProjectForm(name:string,key:string,projectLead:string){
    //console.log(name + ": " + key + ": " + projectLead)
    const dialogref = this.dialog.open(CreateProjectFormComponent,{
      width:'30%',
      data:{
        name:name,
        key:key,
        projectLead:projectLead
      }
    })
    dialogref.afterClosed().subscribe(()=>
      this.getProjects()
    )
    

  }
  deleteProject(name:String){
     this.projectService.deleteProject(name).subscribe(()=>{
       this.getProjects();
     })
  }
  displayedColumns: string[] = ['name', 'key', 'projectLead','action'];


  isEmpty(){
    if(this.dataSource.data){
      return false;
    }
    return true;
  }
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
}
