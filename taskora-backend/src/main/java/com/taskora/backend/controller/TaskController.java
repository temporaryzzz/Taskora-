package com.taskora.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.taskora.backend.dto.TaskCreateRequestDTO;
import com.taskora.backend.dto.TaskDTO;
import com.taskora.backend.dto.TaskResponseDTO;
import com.taskora.backend.dto.TaskUpdateRequestDTO;
import com.taskora.backend.entity.TaskList;
import com.taskora.backend.service.TaskListService;
import com.taskora.backend.service.TaskService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;

// [fix] сейчас любой пользователь может просто по url получать задачи других
@RestController
@RequestMapping("/api/tasks")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TaskController {
    
    @Autowired
    private TaskListService taskListService;
    
    @Autowired
    private TaskService taskService;


    // [fix] написать доки и добавить проверки
    @GetMapping("/{taskList_id}")
    @Operation(description = "Получение всех задач по id списка")
    @ApiResponse(
        responseCode = "200",
        description = "Задачи найдены",
        content = @Content(
            schema = @Schema(implementation = TaskResponseDTO.class) 
        )
    )
    public ResponseEntity<?> getTasks(@PathVariable Long list_id) {
        
        List<TaskDTO> taskDTOs = taskService.findTasksByTaskListId(list_id);

        return ResponseEntity
            .ok()
            .body(new TaskResponseDTO(taskDTOs));
    }

    // [fix] написать доки и добавить проверки
    @PostMapping("")
    @Operation(description = "Создание задачи")
    @ApiResponse(
        responseCode = "201",
        description = "Задача создана",
        content = @Content(
            schema = @Schema(implementation = TaskDTO.class)
        )
    )
    public ResponseEntity<?> createTask(@RequestBody TaskCreateRequestDTO requestDTO) {
        TaskList taskList = taskListService.findTaskListById(requestDTO.getTaskList_id());
        TaskDTO taskDTO = taskService.createTask(taskList, requestDTO.getTitle());
        
        return ResponseEntity
            .status(201)
            .body(taskDTO);
    }

    // [fix] написать доки и добавить проверки
    @PutMapping("/{task_id}")
    @Operation(description = "Обновление задачи")
    @ApiResponse(
        responseCode = "200",
        description = "Задача обновлена",
        content = @Content(
            schema = @Schema(implementation = TaskDTO.class)
        )
    )
    public ResponseEntity<?> updateTask(@PathVariable Long task_id, @RequestBody TaskUpdateRequestDTO requestDTO) {
        TaskDTO updatedTask = taskService.updateTask(task_id, requestDTO);

        return ResponseEntity
            .ok()
            .body(updatedTask);
    }
    
    // [fix] написать доки и добавить проверки
    @DeleteMapping("/{task_id}")
    @Operation(description = "Удаление задачи")
    public ResponseEntity<?> deleteTask(@PathVariable Long task_id) {
        taskService.deleteTaskById(task_id);

        return ResponseEntity
            .status(204)
            .body(null);
    }
}
