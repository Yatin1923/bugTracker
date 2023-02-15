import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/navbar/navbar.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatButtonModule} from '@angular/material/button';
import { SignUpFormComponent } from './shared/sign-up-form/sign-up-form.component';
import {MatInputModule} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import { FooterComponent } from './shared/footer/footer.component';
import { ProjectsComponent } from './projects/projects.component';
import {MatTableModule} from '@angular/material/table';
import { CreateProjectFormComponent } from './shared/create-project-form/create-project-form/create-project-form.component';



@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LandingPageComponent,
    SignUpFormComponent,
    FooterComponent,
    ProjectsComponent,
    CreateProjectFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    HttpClientModule,
    MatTableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
