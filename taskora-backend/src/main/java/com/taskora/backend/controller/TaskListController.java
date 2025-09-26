package com.taskora.backend.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskora.backend.dto.TaskListDTO;
import com.taskora.backend.dto.TaskListResponseDTO;
import com.taskora.backend.service.TaskListService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;

// [fix] сейчас любой пользователь может просто по url получать задачи других
@RestController
@RequestMapping("/api/tasklists")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TaskListController {
    
    TaskListService taskListService;
    

    public TaskListController(TaskListService taskListService) {
        this.taskListService = taskListService;
    }


    // [fix] написать доки и добавить проверки
    @GetMapping("/{user_id}")
    @Operation(description = "Получение списков задач")
    @ApiResponse(
        responseCode = "200",
        description = "Списки задач найдены",
        content = @Content(
            schema = @Schema(implementation = TaskListResponseDTO.class)
        )
    )
    public ResponseEntity<?> getTaskListsForUser(@PathVariable Long user_id) {
        List<TaskListDTO> taskLists = taskListService.findAllTaskListsByOwnerId(user_id);

        return ResponseEntity
            .ok()
            .body(new TaskListResponseDTO(taskLists));
    }
}
