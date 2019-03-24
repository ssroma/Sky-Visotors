import { UsersComponent } from './users/users.component';
import { VisitorsComponent } from './visitors/visitors.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PreebookComponent } from './preebook/preebook.component';

const routes: Routes = [
  { path: '', redirectTo: '/visitors', pathMatch: 'full' },
  { path: 'visitors', component: VisitorsComponent },
  { path: 'prebook', component: PreebookComponent },
  { path: 'users', component: UsersComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export const components = [ VisitorsComponent, PreebookComponent, UsersComponent ];