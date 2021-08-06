import { Injectable } from '@angular/core'
import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Observable, of } from 'rxjs'
import { MessagesService } from './messages.service'
import { catchError, tap } from 'rxjs/operators'
import { Team } from './Team'
import { Employee } from './Employee'

@Injectable({
  providedIn: 'root'
})
export class TeamService {
  constructor (
        private http:HttpClient,
        private messageService: MessagesService
  ) { }

    private apiUrl = 'http://localhost:8080/spring/team';

    private log (message: string) {
      this.messageService.add(`Hero Service: ${message}`)
    }

    private handleError<T> (operation = 'operation', result?:T) {
      return (error:any): Observable<T> => {
        console.error(error)
        this.log(`${operation} failed: ${error.message}`)
        return of(result as T)
      }
    }

    httpOptions = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }

    getteams (): Observable<Team[]> {
      return this.http.get<Team[]>(this.apiUrl).pipe(
        tap(_ => this.log('fetched all team')),
        catchError(this.handleError<Team[]>('getteams', []))
      )
    }

    getteam (id:number): Observable<Team> {
      return this.http.get<Team>(this.apiUrl + `/${id}`).pipe(
        tap(_ => this.log('fetched the employee')),
        catchError(this.handleError<Team>('getEmployee'))
      )
    }

    getMembers (id:number): Observable<Employee[]> {
      return this.http.get<Employee[]>(this.apiUrl + `/${id}/members`).pipe(
        tap(_ => this.log('fetched the members')),
        catchError(this.handleError<Employee[]>('getMembers'))
      )
    }

    addNewMember (employee_id:number, team_id:number): Observable<Team> {
      const formData = new FormData()
      formData.append('employee_id', employee_id.toString())

      return this.http.post<Team>(this.apiUrl + `/addNew${team_id}`, formData).pipe(
        tap(employee => this.log(`add new member with id=${employee_id}`)),
        catchError(this.handleError<Team>('addNewMember'))
      )
    }

    addNewteam (teamName:string): Observable<Team> {
      const formData = new FormData()
      formData.append('name', teamName)

      return this.http.post<Team>(this.apiUrl + '/add', formData).pipe(
        tap(team => this.log(`add new team with id=${team.id}`)),
        catchError(this.handleError<Team>('getteame'))
      )
    }

    removeMember (employeeID: number, team_id: number): Observable<Team> {
      const formData = new FormData()
      formData.append('employee_id', employeeID.toString())

      return this.http.post<Team>(this.apiUrl + `/remove${team_id}`, formData).pipe(
        tap(team => this.log(`add new team with id=${team.id}`)),
        catchError(this.handleError<Team>('getteame'))
      )
    }

    deleteteam (id:number) {
      return this.http.delete(`http://localhost:8080/spring/team/del${id}`).pipe(
        tap(_ => this.log(`deleted team w/ id=${id}`)),
        catchError(this.handleError<any>('deleteteam'))
      )
    }

    updateteam (team: Team) {
      const formData = new FormData()
      formData.append('teamName', team.teamName)
      console.log(team.id)
      return this.http.put(`http://localhost:8080/spring/team/update${team.id}`, formData).pipe(
        tap(_ => this.log(`updated team id=${team.id}`)),
        catchError(this.handleError<any>('updateteam'))
      )
    }
}
