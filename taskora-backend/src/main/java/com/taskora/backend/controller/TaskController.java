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
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import java.util.ArrayList;
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


    @GetMapping("/{taskListId}")
    @Operation(description = "Получение всех задач по id списка")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Задачи найдены",
            content = @Content(
                schema = @Schema(implementation = TaskResponseDTO.class) 
            )
        ),
        @ApiResponse(
            responseCode = "204",
            description = "Задачи не найдены",
            content = {}
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Список не найден",
            content = {}
        )
    })
    public ResponseEntity<?> getTasks(@PathVariable Long taskListId) {
        List<TaskDTO> taskDTOs = new ArrayList<>();
        TaskList list = taskListService.findTaskListById(taskListId);

        if (list == null)
            return ResponseEntity
                .notFound()
                .build();

        String title = list.getTitle();

        // Лучше было бы не title проверять, а параметром получать ?all, ?completed, ?deleted
        switch (title) {
            // case "All" -> taskDTOs = taskService.findTasksByOwnerId(list.getOwner().getId());
            case "Completed" -> taskDTOs = taskService.findCompletedAndNotDeletedTasksByOwnerId(list.getOwner().getId());
            case "Basket" -> taskDTOs = taskService.findDeletedTasksByOwnerId(list.getOwner().getId());
            default -> taskDTOs = taskService.findNotDeletedTasksByTaskListId(list.getId());
        }
        
        if (taskDTOs.isEmpty())
            return ResponseEntity
                .noContent()
                .build();

        return ResponseEntity
            .ok()
            .body(new TaskResponseDTO(taskDTOs));
    }

    @PostMapping("")
    @Operation(description = "Создание задачи")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "201",
            description = "Задача создана",
            content = @Content(
                schema = @Schema(implementation = TaskDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Список задач не найден",
            content = {}
        )
    })
    public ResponseEntity<?> createTask(@RequestBody TaskCreateRequestDTO requestDTO) {
        // [fix] тут 404 не только если список не найден, но и если id списка null
        TaskList taskList = taskListService.findTaskListById(requestDTO.getTaskListId());
        if (taskList == null)
            return ResponseEntity
                .notFound()
                .build();

        TaskDTO taskDTO = taskService.createTask(taskList, requestDTO);
        
        return ResponseEntity
            .status(201)
            .body(taskDTO);
    }

    @PutMapping("/{taskId}")
    @Operation(description = "Обновление задачи")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Задача обновлена",
            content = @Content(
                schema = @Schema(implementation = TaskDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Задача не найдена",
            content = {}
        )
    })
    public ResponseEntity<?> updateTask(@PathVariable Long taskId, @RequestBody TaskUpdateRequestDTO requestDTO) {
        TaskList taskList = taskListService.findTaskListById(requestDTO.getTaskListId());
        if (taskList == null)
            return ResponseEntity
                .notFound()
                .build();

        TaskDTO updatedTask = taskService.updateTask(taskId, taskList, requestDTO);
        if (updatedTask == null)
            return ResponseEntity
                .notFound()
                .build();

        return ResponseEntity
            .ok()
            .body(updatedTask);
    }
    
    @DeleteMapping("/{taskId}")
    @Operation(description = "Удаление задачи")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "204",
            description = "Задача успешно удалена",
            content = {}
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Задача не найдена",
            content = {}
        )
    })
    public ResponseEntity<?> softDeleteTask(@PathVariable Long taskId) {
        if (!taskService.softDeleteTaskById(taskId))
            return ResponseEntity
                .notFound()
                .build();

        return ResponseEntity
            .status(204)
            .body(null);
    }

    @DeleteMapping("/{taskId}/hard")
    @Operation(description = "Удаление задачи (old)")
    public ResponseEntity<?> hardDeleteTask(@PathVariable Long taskId) {
        taskService.deleteTaskById(taskId);

        return ResponseEntity
            .status(204)
            .body(null);
    }
}
