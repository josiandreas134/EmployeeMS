import { Component, OnInit } from '@angular/core';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';
import { Team } from '../Team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-manage-page',
  templateUrl: './manage-page.component.html',
  styleUrls: ['./manage-page.component.css']
})
export class ManagePageComponent implements OnInit {

  add = false;
  deletion = false;
  EditBtn = false;
  teamadd = false;
  teamdeletion = false;
  teamEditBtn = false;

  employees: Employee[] = [];
  teams: Team[] = [];
  constructor(
    private employeeService: EmployeeService,
    private teamService: TeamService,
    ) { }

  ngOnInit() {
    this.getEmployees();
    this.getteams();
  }

  AddButtonClick(): void{
    this.add? this.add=false: this.add=true;
    this.deletion = false;
    this.EditBtn = false;
  }

  AddteamButtonClick(): void{
    this.teamadd? this.teamadd=false: this.teamadd=true;
    this.teamdeletion = false;
    this.teamEditBtn = false;
  }

  DeleteButtonClick(): void{
    this.deletion? this.deletion=false: this.deletion=true;
    this.add = false;
    this.EditBtn = false;

  }

  teamDeleteButtonClick(): void{
    this.teamdeletion? this.teamdeletion=false: this.teamdeletion=true;
    this.teamadd = false;
    this.teamEditBtn = false;

  }

  EditClicked(): void{
    this.EditBtn? this.EditBtn=false: this.EditBtn=true;
    this.deletion = false;
    this.add = false;

  }

  teamEditClicked(): void{
    this.teamEditBtn? this.teamEditBtn=false: this.teamEditBtn=true;
    this.teamdeletion = false;
    this.teamadd = false;
  }

  AddNewEmployee(name:string, phoneNo:string, position:string): void{
    const id:number = this.employees.length;
    name = name.trim();
    position = position.trim();
    if (!name){ return;}
    this.employeeService.addEmployee({id, name, phoneNo, position} as Employee).subscribe(employee => this.employees.push(employee));
    this.add = false;
  }

  AddNewteam(teamName:string): void{
    this.teamService.addNewteam(teamName).subscribe(team => this.teams.push(team));
  }

  DeleteEmployee(name: string): void{
    const result = this.employees.filter(obj => {
      return obj.name === name
    })
    console.log(result[0]['id']);
    this.employeeService.deleteEmployee(result[0]['id']).subscribe();
    this.deletion=false;
  }

  Deleteteam(name: string): void{
    const result = this.teams.filter(obj => {
      return obj.teamName === name
    })
    console.log(result[0]['id']);
    this.teamService.deleteteam(result[0]['id']).subscribe();
    this.teamdeletion=false;
  }

  getEmployees(): void {
    this.employeeService.getEmployees().subscribe(employees => this.employees = employees)
  }

  getteams(): void {
    this.teamService.getteams().subscribe(teams => this.teams = teams)
  }

  Reset ():void {
    this.employeeService.deleteAll().subscribe()
  }


}
