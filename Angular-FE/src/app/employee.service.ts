import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Employee } from './Employee';
import { catchError, tap } from 'rxjs/operators';
import { MessagesService } from './messages.service';
//import { Team } from './Team';

@Injectable({
    providedIn: 'root',
})
export class EmployeeService {

private apiUrl = `http://localhost:8080/spring`;

private log(message: string){
    this.messageService.add(`Hero Service: ${message}`)
}

private handleError<T>(operation = 'operation', result?:T){
    return (error:any): Observable<T> =>
    {
        console.error(error);
        this.log(`${operation} failed: ${error.message}`);
        return of(result as T);
    };
}

httpOptions = {
    headers: new HttpHeaders({'Content-Type':'application/json'})
}

constructor(
    private http:HttpClient,
    private messageService: MessagesService,
    ) { }

getEmployees(): Observable<Employee[]>{
    return this.http.get<Employee[]>("http://localhost:8080/spring").pipe(
        tap(_ => this.log('fetched all employee')),
        catchError(this.handleError<Employee[]>('getEmployees',[]))
    );
}

getEmployee(id:number): Observable<Employee>{
    return this.http.get<Employee>(this.apiUrl+`/${id}`).pipe(
        tap(_ => this.log('fetched the employee')),
        catchError(this.handleError<Employee>('getEmployee',))
    );
}

addEmployee(employee: Employee): Observable<Employee>{
    const formData = new FormData(); 
    formData.append("name",employee.name);
    formData.append("phoneNo",employee.phoneNo);
    formData.append("position",employee.position);

    return this.http.post<Employee>("http://localhost:8080/spring/add", formData).pipe(
        tap((employee: Employee) => this.log(`added`)),
        catchError(this.handleError<Employee>('addEmployees',))
    );
}

deleteEmployee(id:number){
    return this.http.delete(`http://localhost:8080/spring/del${id}`).pipe(
        tap(_ => this.log(`deleted employee w/ id=${id}`)),
        catchError(this.handleError<any>('deleteEmployee'))
    )
}


deleteAll() {
    return this.http.get('http://localhost:8080/spring/deleteAll').pipe(
      tap(_ => this.log('deleted all')),
      catchError(this.handleError<any>('deleteAll'))
    )
  }

updateEmployee(employee: Employee){
    const formData = new FormData(); 
    formData.append("name",employee.name);
    formData.append("phoneNo",employee.phoneNo);
    formData.append("position",employee.position);
    console.log(employee.id);
    return this.http.put(`http://localhost:8080/spring/update${employee.id}`, formData).pipe(
        tap(_ => this.log(`updated employee id=${employee.id}`)),
        catchError(this.handleError<any>('updateEmployee'))
    );
}

searchEmployee(term: string): Observable<Employee[]>{
    if(!term.trim()){
        return of([])
    }
    return this.http.get<Employee[]>(`${this.apiUrl}/search=${term}`).pipe(
        tap(x => x.length? 
            this.log(`found hero(es) matching ${x}`):
            this.log(`found no hero(es) matching ${x}`)),
            catchError(this.handleError<Employee[]>('searchEmployee', []))
    )

}
/*
searchEmployee(term: string): Observable<Employee[]>{
    if(!term.trim()){
        return of([])
    }
    return this.http.get<Employee[]>(`${this.apiUrl}/search=${term}`).pipe(
        tap(x => x.length? 
            this.log(`found hero(es) matching ${x}`):
            this.log(`found no hero(es) matching ${x}`)),
            catchError(this.handleError<Employee[]>('searchEmployee', []))
    )

}

deleteAll() {
    return this.http.get('http://localhost:8080/spring/deleteAll').pipe(
      tap(_ => this.log('deleted all')),
      catchError(this.handleError<any>('deleteAll'))
    )
  }

addToTeam(employee_id: number, team_id: number){
    const formData = new FormData(); 
    formData.append("team_id", team_id.toString());

    return this.http.put(`http://localhost:8080/spring/addtoteam${employee_id}`, formData).pipe(
        tap(_ => this.log(`add to team ${team_id}, id=${employee_id}`)),
        catchError(this.handleError<any>('addtoTeam'))
    );
}
*/

}
