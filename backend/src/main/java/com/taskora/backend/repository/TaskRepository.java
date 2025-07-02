package com.taskora.backend.repository;

import com.taskora.backend.model.entity.Task;
import org.springframework.data.repository.CrudRepository;

import java.util.List;

public interface TaskRepository extends CrudRepository<Task, Long> {
    List<Task> findAll();
}
