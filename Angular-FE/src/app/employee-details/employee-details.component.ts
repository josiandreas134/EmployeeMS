import { Component, OnInit } from '@angular/core'
import { Employee } from '../Employee'
import { EmployeeService } from '../employee.service'
import { ActivatedRoute } from '@angular/router'
import { Team } from '../Team'
import { TeamService } from '../team.service'
import { ThrowStmt } from '@angular/compiler'

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  employee: Employee | undefined;
  EditBtn= false;
  DeleteBtn = false;
  showteam = false;
  teams: Team[] = [];

  constructor (
    private employeeService: EmployeeService,
    private route: ActivatedRoute,
    private teamService: TeamService
  ) { }

  ngOnInit () {
    this.getEmployee()
    this.getteams()
  }

  getEmployee (): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
    this.employeeService.getEmployee(id).subscribe(employee => this.employee = employee)
  }

  getteams (): void {
    this.teamService.getteams().subscribe(teams => this.teams = teams)
  }

  EditClicked (): void {
    this.EditBtn ? this.EditBtn = false : this.EditBtn = true
  }

  DeleteClicked (): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
    this.employeeService.deleteEmployee(id).subscribe()
    location.reload()
  }

  AddtoTeamClicked (): void {
    this.showteam ? this.showteam = false : this.showteam = true
  }

  addtoTeam (employee_id: number, team_id: number): void {
    this.employeeService.addToTeam(employee_id, team_id).subscribe(employee => this.employee = employee)
  }

  UpdateEmployee (employee: Employee, newName: string, newPhone: string, newPosition: string): void {
    employee.name = newName
    employee.phoneNo = newPhone
    employee.position = newPosition

    this.employeeService.updateEmployee(employee).subscribe()
  }
}
