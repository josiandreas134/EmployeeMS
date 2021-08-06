import { Component, OnInit } from '@angular/core'
import { TeamService } from '../team.service'
import { Team } from '../Team'
import { ActivatedRoute } from '@angular/router'
import { Employee } from '../Employee'
import { EmployeeService } from '../employee.service'

@Component({
  selector: 'app-team-details',
  templateUrl: './team-details.component.html',
  styleUrls: ['./team-details.component.css']
})
export class TeamDetailsComponent implements OnInit {
  team: Team | undefined;
  employees: Employee[] = [];
  members: Employee[] = [];
  EditBtn = false;
  showEmployee = false;
  showMember = false;

  constructor (
    private teamService: TeamService,
    private employeeService: EmployeeService,
    private route: ActivatedRoute
  ) { }

  ngOnInit () {
    this.getteam()
    this.getEmployees()
    this.getMembers()
  }

  // get section
  getteam (): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
    this.teamService.getteam(id).subscribe(team => this.team = team)
  }

  getEmployees (): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees)
  }

  getMembers (): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
    this.teamService.getMembers(id).subscribe(members => this.members = members)
  }

  addMember (employee_id: number, team_id: number): void {
    this.teamService.addNewMember(employee_id, team_id).subscribe(team => this.team = team)
  }

  Updateteam (team: Team, newName: string): void {
    team.teamName = newName

    this.teamService.updateteam(team).subscribe()
  }

  removeMember (employeeID: number): void {
    const team_id = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
    this.teamService.removeMember(employeeID, team_id).subscribe(team => this.team = team)
    location.reload()
  }

  Deleteteam (): void {
    const id = parseInt(this.route.snapshot.paramMap.get('id')!, 10)
    this.teamService.deleteteam(id).subscribe()
    location.reload()
  }

  // button section
  EditClicked (): void {
    this.EditBtn ? this.EditBtn = false : this.EditBtn = true
  }

  AddMemberClicked (): void {
    this.showEmployee ? this.showEmployee = false : this.showEmployee = true
  }

  RemoveMemberClicked (): void {
    this.showMember ? this.showMember = false : this.showMember = true
  }
}
