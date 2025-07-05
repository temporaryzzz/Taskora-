package com.taskora.backend.repository;

import com.taskora.backend.model.entity.Task;
import org.springframework.data.repository.CrudRepository;

public interface TaskRepository extends CrudRepository<Task, Long> {
}
