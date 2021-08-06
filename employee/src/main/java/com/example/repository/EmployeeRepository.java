package com.example.repository;

import java.util.ArrayList;
import java.util.Locale;

import com.example.entity.Employee;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface EmployeeRepository extends CrudRepository<Employee, Integer> {

    Employee findById(long id);

    @Transactional
    void deleteById(long id);

    default Iterable<Employee> searchByname(CharSequence term){
        Iterable<Employee> employees = findAll();
        //List of employees to be returned
        ArrayList<Employee> Employeefound = new ArrayList<Employee>();

        //for every employee in employees Iterable
        for ( Employee employee: employees) {
            //get employee's name
            String employeeName = employee.getName();
            //if employee's name contains the term that is being typed in the search bar, add it to the
            //Employeefound ArrayList that is going to be returned (CASE INSENSITIVE)
            if(NamecontainTerm(employeeName,term)){
                Employeefound.add(employee);
            }
        }
        return Employeefound;
    }

    private boolean NamecontainTerm(String name, CharSequence term){
        return name.toLowerCase().contains(term.toString().toLowerCase(Locale.ROOT));
    }
}