package com.taskora.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.taskora.backend.dto.TaskDTO;
import com.taskora.backend.dto.TaskListDTO;
import com.taskora.backend.dto.TaskListResponseDTO;
import com.taskora.backend.dto.TaskResponseDTO;
import com.taskora.backend.entity.TaskList;
import com.taskora.backend.service.TaskListService;
import com.taskora.backend.service.TaskService;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/task")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
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

    // [fix] написать доки и добавить проверки
    @PostMapping("/create")
    public ResponseEntity<?> createTask(@RequestBody TaskDTO requestDTO) {
        TaskList taskList = taskListService.findTaskListById(requestDTO.getTaskList_id());
        taskService.createTask(taskList, requestDTO.getTitle());
        
        return ResponseEntity
            .ok()
            .body(null);
    }

    // [fix] написать доки и добавить проверки
    @PostMapping("/update/{task_id}")
    public ResponseEntity<?> updateTask(@PathVariable Long task_id, @RequestBody TaskDTO requestDTO) {
        requestDTO.setId(task_id);
        TaskDTO updatedTask = taskService.updateTask(requestDTO);

        return ResponseEntity
            .ok()
            .body(updatedTask);
    }
    
    // [fix] написать доки и добавить проверки
    @DeleteMapping("/delete/{task_id}")
    public ResponseEntity<?> deleteTask(@PathVariable Long task_id) {
        taskService.deleteTaskById(task_id);

        return ResponseEntity
            .ok()
            .body(null);
    }
}
