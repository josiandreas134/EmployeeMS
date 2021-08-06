package com.example.entity;

import javax.persistence.*;
import java.lang.reflect.Array;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@Table(name = "team")
@Entity
public class Team {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String teamName;

    @ManyToMany(mappedBy = "belongsToTeam")
    Set<Employee> members;

    public Team(){
    };

    public Team(String name){
        this.teamName = name;
    }


    public long getId() {
        return id;
    }
    public String getTeamName() {
        return teamName;
    }
    public Set<String> getMembers(){
        Set<String> member_id = new HashSet<String>();
        for(Employee member: members){
            member_id.add(member.getName());
        }
        return member_id;
    }

    public void setTeamName(String name){
        this.teamName = name;
    }

    public void addTeamMember(Employee employee){
        this.members.add(employee);
    }



}