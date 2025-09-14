package com.taskora.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskora.backend.entity.TaskList;

public interface TaskListRepository extends JpaRepository<TaskList, Long> {
    List<TaskList> findByOwnerId(Long ownerId);
}
