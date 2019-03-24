import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { AppRoutingModule, components } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
//import { UsersComponent } from './users/users.component';
//import { VisitorsComponent } from './visitors/visitors.component';
//import { PreebookComponent } from './preebook/preebook.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    components, // UsersComponent, VisitorsComponent, PreebookComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
