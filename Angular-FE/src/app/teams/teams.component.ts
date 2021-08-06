import { Component, OnInit } from '@angular/core'
import { TeamService } from '../team.service'
import { Team } from '../Team'

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.css']
})
export class TeamsComponent implements OnInit {
  team: Team | undefined;
  teams: Team[] = [];
  constructor (
    private teamService: TeamService
  ) { }

  ngOnInit () {
    this.getteams()
  }

  getteams (): void {
    this.teamService.getteams().subscribe(teams => this.teams = teams)
  }

  getteam (id: number): void {
    this.teamService.getteam(id).subscribe(team => this.team = team)
  }
}
