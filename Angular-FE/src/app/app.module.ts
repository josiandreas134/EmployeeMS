import { HttpClientModule } from '@angular/common/http'
import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { EmployeesComponent } from './employees/employees.component'
import { EmployeeDetailsComponent } from './employee-details/employee-details.component'
import { EmployeeSearchComponent } from './employee-search/employee-search.component'
import { TeamsComponent } from './teams/teams.component'
import { TeamDetailsComponent } from './team-details/team-details.component'
import { ManagePageComponent } from './manage-page/manage-page.component'

@NgModule({
  declarations: [
    AppComponent,
    EmployeesComponent,
    EmployeeDetailsComponent,
    EmployeeSearchComponent,
    TeamsComponent,
    TeamDetailsComponent,
    ManagePageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
