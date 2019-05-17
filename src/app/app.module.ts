import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'

import { UsersService } from './services/users.service';
import { AppRoutingModule, components } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { PrebooksService } from './services/prebooks.service';
import { LoggedComponent } from './visitors/logged/logged.component';
import { LoggedOutComponent } from './visitors/logged-out/logged-out.component';
import { EditingComponent } from './visitors/editing/editing.component';
//import { PrebookUserComponent } from './preebook/prebook-user/prebook-user.component';
//import { UsersComponent } from './users/users.component';
//import { VisitorsComponent } from './visitors/visitors.component';
//import { PreebookComponent } from './preebook/preebook.component';

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    components,
    LoggedComponent,
    LoggedOutComponent,
    EditingComponent, // UsersComponent, VisitorsComponent, PreebookComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    UsersService,
    PrebooksService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
