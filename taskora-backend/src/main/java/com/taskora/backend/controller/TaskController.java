package com.taskora.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskora.backend.dto.TaskDTO;
import com.taskora.backend.dto.TaskListDTO;
import com.taskora.backend.dto.TaskListResponseDTO;
import com.taskora.backend.dto.TaskResponseDTO;
import com.taskora.backend.service.TaskListService;
import com.taskora.backend.service.TaskService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;


@RestController
@RequestMapping("/api/task")
public class TaskController {
    
    TaskListService taskListService;
    TaskService taskService;
    
    
    public TaskController(TaskListService taskListService, TaskService taskService) {
        this.taskListService = taskListService;
        this.taskService = taskService;
    }

    // [fix] написать доки и добавить проверки
    @GetMapping("/lists/{user_id}")
    public ResponseEntity<?> getTaskListsForUser(@PathVariable Long user_id) {
        List<TaskListDTO> taskLists = taskListService.findAllTaskListsByOwnerId(user_id);

        return ResponseEntity
            .ok()
            .body(new TaskListResponseDTO(taskLists));
    }

    // [fix] написать доки и добавить проверки
    @GetMapping("/tasks/{list_id}")
    public ResponseEntity<?> getTasks(@PathVariable Long list_id) {
        
        List<TaskDTO> taskDTOs = taskService.findTasksByTaskListId(list_id);

        return ResponseEntity
            .ok()
            .body(new TaskResponseDTO(taskDTOs));
    }
}
