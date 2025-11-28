package com.taskora.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.CrossOrigin;

import com.taskora.backend.dto.ErrorMessageDTO;
import com.taskora.backend.dto.TaskCreateRequestDTO;
import com.taskora.backend.dto.TaskDTO;
import com.taskora.backend.dto.TaskResponseDTO;
import com.taskora.backend.dto.TaskUpdateRequestDTO;
import com.taskora.backend.entity.TaskList;
import com.taskora.backend.service.TaskListService;
import com.taskora.backend.service.TaskService;
import com.taskora.backend.utils.SecurityUtils;

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
            responseCode = "403",
            description = "Доступ запрещен",
            content = @Content(
                schema = @Schema(implementation = ErrorMessageDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Список не найден",
            content = {}
        )
    })
    public ResponseEntity<?> getTasks(@PathVariable Long taskListId) {
        List<TaskDTO> taskDTOs = new ArrayList<>();

        TaskList list = taskListService.findTaskListById(taskListId, SecurityUtils.getCurrentUserId());
        taskDTOs = taskService.findNotDeletedTasksByTaskListId(list.getId());
        
        if (taskDTOs.isEmpty())
            return ResponseEntity
                .noContent()
                .build();

        return ResponseEntity
            .ok()
            .body(new TaskResponseDTO(taskDTOs));
    }

    @GetMapping("")
    @Operation(description = "Получение задач в системных списках")
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
            responseCode = "400",
            description = "Неизвестный системный список",
            content = @Content(
                schema = @Schema(implementation = ErrorMessageDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Доступ запрещен",
            content = @Content(
                schema = @Schema(implementation = ErrorMessageDTO.class)
            )
        )
    })
    public ResponseEntity<?> getTasksFromSystemList(@RequestParam String system) {
        List<TaskDTO> taskDTOs = new ArrayList<>();
        Long currentUserId = SecurityUtils.getCurrentUserId();

        switch (system) {
            case "all":
                taskDTOs = taskService.findNonDeletedTasksByOwnerId(currentUserId);
                break;
            case "completed":
                taskDTOs = taskService.findCompletedAndNotDeletedTasksByOwnerId(currentUserId);
                break;
            case "deleted":
                taskDTOs = taskService.findDeletedTasksByOwnerId(currentUserId);
                break;
            default:
                return ResponseEntity
                    .badRequest()
                    .body(new ErrorMessageDTO("Неизвестный системный список"));
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
            responseCode = "400",
            description = "Задача не может быть создана в удаленном списке",
            content = @Content(
                schema = @Schema(implementation = ErrorMessageDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Доступ запрещен",
            content = @Content(
                schema = @Schema(implementation = ErrorMessageDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Список не найден",
            content = {}
        )
    })
    public ResponseEntity<?> createTask(@RequestBody TaskCreateRequestDTO requestDTO) {
        TaskList list = taskListService.findTaskListById(requestDTO.getTaskListId(), SecurityUtils.getCurrentUserId());

        if (list.isDeleted())
            return ResponseEntity
                .badRequest()
                .body(new ErrorMessageDTO("Задача не может быть создана в удаленном списке"));

        TaskDTO taskDTO = taskService.createTask(list, requestDTO);
        
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
            responseCode = "403",
            description = "Доступ запрещен",
            content = @Content(
                schema = @Schema(implementation = ErrorMessageDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Задача или список не найдены",
            content = {}
        )
    })
    public ResponseEntity<?> updateTask(@PathVariable Long taskId, @RequestBody TaskUpdateRequestDTO requestDTO) {
        TaskList taskList = taskListService.findTaskListById(requestDTO.getTaskListId(), SecurityUtils.getCurrentUserId());

        TaskDTO updatedTask = taskService.updateTask(taskId, taskList, requestDTO);

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
            responseCode = "403",
            description = "Доступ запрещен",
            content = @Content(
                schema = @Schema(implementation = ErrorMessageDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Задача не найдена",
            content = {}
        )
    })
    public ResponseEntity<?> softDeleteTask(@PathVariable Long taskId) {
        taskService.softDeleteTaskById(taskId, SecurityUtils.getCurrentUserId());

        return ResponseEntity
            .status(204)
            .body(null);
    }

    // @DeleteMapping("/{taskId}/hard")
    // @Operation(description = "Удаление задачи (old)")
    // public ResponseEntity<?> hardDeleteTask(@PathVariable Long taskId) {
    //     taskService.deleteTaskById(taskId);

    //     return ResponseEntity
    //         .status(204)
    //         .body(null);
    // }
}
