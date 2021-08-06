import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesComponent } from './employees/employees.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailsComponent } from './team-details/team-details.component';
import { ManagePageComponent } from './manage-page/manage-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/employees', pathMatch:'full'},
  { path: 'employees', component: EmployeesComponent},
  { path: 'edit', component:ManagePageComponent },
  { path: 'details/:id', component:EmployeeDetailsComponent},
  { path: 'teams', component: TeamsComponent},
  { path: 'teams/details/:id', component: TeamDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
