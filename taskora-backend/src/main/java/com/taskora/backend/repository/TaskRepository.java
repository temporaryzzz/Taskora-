package com.taskora.backend.repository;

import java.time.Instant;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.taskora.backend.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    List<Task> findByTaskListId(Long taskListId);
    List<Task> findByTaskListIdAndDeletedFalse(Long taskListId);
    List<Task> findByOwnerId(Long Userid);
    List<Task> findByOwnerIdAndDeletedFalse(Long Userid);
    List<Task> findByOwnerIdAndDeletedTrue(Long Userid);
    List<Task> findByOwnerIdAndCompletedTrueAndDeletedFalse(Long Userid);
    List<Task> findByOwnerIdAndDeletedFalseAndDueDateBetween(Long Userid, Instant start, Instant end);
}
