package com.taskora.backend.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskora.backend.entity.Task;

public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTaskListId(Long taskListId);
    List<Task> findByTaskListOwnerId(Long ownerId);
}
