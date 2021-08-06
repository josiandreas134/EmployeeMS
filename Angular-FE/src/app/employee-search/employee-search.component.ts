import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounce, debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Employee } from '../Employee';
import { EmployeeService } from '../employee.service';

@Component({
  selector: 'app-employee-search',
  templateUrl: './employee-search.component.html',
  styleUrls: ['./employee-search.component.css']
})
export class EmployeeSearchComponent implements OnInit {
  employees$!: Observable<Employee[]>;
  private searchTerms = new Subject<string>();

  constructor(private employeeService: EmployeeService) { }


  search(term: string): void {
    this.searchTerms.next(term);
  }

  
  ngOnInit(): void {
    this.employees$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term:string) => this.employeeService.searchEmployee(term)),
    );
  }


}
