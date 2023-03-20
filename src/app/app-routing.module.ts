import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { ProjectsComponent } from './projects/projects.component';
import { AuthGuard } from './Auth/auth.guard';
import { LoginGuard } from './Auth/login.guard';
import { BugsComponent } from './bugs/bugs.component';
import { CreateBugFormComponent } from './bugs/create-bugs-form/create-bug-form/create-bug-form.component';


const routes: Routes = [
  {path:'', component:LandingPageComponent,canActivate:[LoginGuard]},
  {path:'projects', component:ProjectsComponent,canActivate: [AuthGuard]},
  {path:'projects/:projectName',component:BugsComponent,canActivate: [AuthGuard]},
  {path:'projects/:projectName/createBug',component:CreateBugFormComponent,canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
