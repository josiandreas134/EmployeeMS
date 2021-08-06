package com.example.controller;

import com.example.entity.Employee;
import com.example.entity.Team;
import com.example.repository.EmployeeRepository;
import com.example.repository.TeamRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.Set;

@RestController
public class TeamController {
    @Autowired
    private TeamRepository teamRepository;
    @Autowired
    private EmployeeRepository employeeRepository;

    @GetMapping(path="/spring/team")
    public @ResponseBody Iterable<Team> getAllTeam() {
        return teamRepository.findAll();
    }

    @GetMapping(path="/spring/team/{id}")
    public @ResponseBody Team getTeam(@PathVariable long id) {
        return teamRepository.findById(id);
    }

    @GetMapping(path="/spring/team/{id}/members")
    public @ResponseBody Iterable<Employee> getMembers(@PathVariable long id) {
        Team team = teamRepository.findById(id);
        Iterable<Employee> employees = employeeRepository.findAll();
        ArrayList<Employee> members = new ArrayList<Employee>();
        for(Employee employee: employees){
            if(employee.getBelongsToTeam().contains(team)){
                members.add(employee);
            }
        }
        return members;
    }

    @RequestMapping(value="/spring/team/del{id}", method = {RequestMethod.DELETE})
    public @ResponseBody void deleteTeam(@PathVariable int id) {
        Iterable<Employee> employees = employeeRepository.findAll();
        for(Employee employee:employees){
            Set<Team> teamlist = employee.getBelongsToTeam();
            for(Team team: teamlist){
                if (team.getId() == id){
                    employee.getBelongsToTeam().remove(team);
                }
            }
        }
        teamRepository.deleteById(id);
    }

    @RequestMapping(value="/spring/team/add", method = {RequestMethod.POST})
    public @ResponseBody
    Team addNewTeam(String name) {

        //this will create a new entity and save it to the system
        Team n = new Team(name);
        teamRepository.save(n);
        return n;
    }

    @RequestMapping(value="/spring/team/addNew{team_id}", method = {RequestMethod.POST})
    public @ResponseBody Team addMember(int employee_id, @PathVariable int team_id){
        Team team = getTeam(team_id);
        Employee employee = employeeRepository.findById(employee_id);
        employee.getBelongsToTeam().add(team);
        employeeRepository.save(employee);
        return team;
    }

    @RequestMapping(value="/spring/team/remove{team_id}", method = {RequestMethod.POST})
    public @ResponseBody Team removeMember(int employee_id, @PathVariable int team_id){
        Team team = getTeam(team_id);
        Employee employee = employeeRepository.findById(employee_id);
        employee.getBelongsToTeam().remove(team);
        employeeRepository.save(employee);
        return team;
    }

    @RequestMapping(value="/spring/team/update{id}", method = {RequestMethod.PUT})
    public @ResponseBody Team updateTeam(Team input, @PathVariable int id) {

        Team team = getTeam(id);
        if (input.getTeamName() != null && team !=null){ team.setTeamName(input.getTeamName());}
        return teamRepository.save(team);
    }




}
