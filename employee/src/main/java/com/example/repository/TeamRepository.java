package com.example.repository;

import com.example.entity.Employee;
import com.example.entity.Team;
import org.springframework.data.repository.CrudRepository;
import org.springframework.transaction.annotation.Transactional;

public interface TeamRepository extends CrudRepository<Team, Long> {
    Team findById(long id);

    @Transactional
    void deleteById(long id);
}