import { Component,OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { CreateProjectFormComponent } from './create-project-form/create-project-form.component';
import { NotifyService } from '../shared/notifyService/notify.service';
import { ProjectService } from './project.service';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent {

  constructor(private projectService:ProjectService,private dialog:MatDialog,private notify:NotifyService){}
  
  // Mat table variables
  dataSource: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'key', 'projectLead','action'];

  // Get project on init
  ngOnInit(){
    this.getProjects();
  }

  // Create project
  createProject(){
    const dialogref = this.dialog.open(CreateProjectFormComponent,{
      width:'30%',
    })
    dialogref.afterClosed().subscribe(()=>
      this.getProjects()
    )
  }

  // Get projects
  getProjects(){
    this.projectService.getProject().subscribe((data:any)=>{
      this.dataSource = new MatTableDataSource(data);
    })
  }


  // Edit projects
  editProjectForm(name:string,key:string,projectLead:string){
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

  // Delete projects
  deleteProject(name:String){
     this.projectService.deleteProject(name).subscribe((response)=>{
      this.notify.showSuccess(response);
       this.getProjects();
     })
  }


// Mat table filter
  applyFilter(event:Event){
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
 
}
