package com.example.entity;

import javax.persistence.*;
import java.util.Set;

@Table(name = "employee")
@Entity
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String name;
    private String phoneNo;
    private String position;

    @ManyToMany
    @JoinTable(
            name = "team_member",
            joinColumns = @JoinColumn(name = "employee_id"),
            inverseJoinColumns = @JoinColumn(name = "team_id")
    )
    Set<Team> belongsToTeam;


    public Employee(){
    };

    public Employee(String name, String phoneNo, String position){
        this.name = name;
        this.phoneNo = phoneNo;
        this.position = position;
    }
    public long getId() {
        return id;
    }

    public String getPhoneNo() {
        return phoneNo;
    }

    public String getName() {
        return name;
    }

    public String getPosition() {
        return position;
    }

    public Set<Team> getBelongsToTeam() {return belongsToTeam;}

    public void setName(String name) {
        this.name = name;
    }

    public void setPhoneNo(String phoneNo) {
        this.phoneNo = phoneNo;
    }

    public void setPosition(String position) {
        this.position = position;
    }
}
