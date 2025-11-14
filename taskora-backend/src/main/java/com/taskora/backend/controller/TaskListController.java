package com.taskora.backend.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskora.backend.dto.TaskListCreateRequestDTO;
import com.taskora.backend.dto.TaskListDTO;
import com.taskora.backend.dto.TaskListResponseDTO;
import com.taskora.backend.dto.TaskListUpdateRequest;
import com.taskora.backend.entity.User;
import com.taskora.backend.service.TaskListService;
import com.taskora.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.PutMapping;

// [fix] сейчас любой пользователь может просто по url получать задачи других
@RestController
@RequestMapping("/api/tasklists")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class TaskListController {
    
    @Autowired
    private TaskListService taskListService;

    @Autowired
    private UserService userService;


    @GetMapping("/{user_id}")
    @Operation(description = "Получение списков задач")
    @ApiResponses( value = {
        @ApiResponse(
            responseCode = "200",
            description = "Списки задач найдены",
            content = @Content(
                schema = @Schema(implementation = TaskListResponseDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "204",
            description = "Списки задач отсутствуют",
            content = {}
        )
    })
    public ResponseEntity<?> getTaskListsForUser(@PathVariable Long user_id) {
        List<TaskListDTO> taskLists = taskListService.findAllTaskListsByOwnerId(user_id);

        if (taskLists.isEmpty())
            return ResponseEntity
                .noContent()
                .build();

        return ResponseEntity
            .ok()
            .body(new TaskListResponseDTO(taskLists));
    }
    
    @PostMapping("")
    @Operation(description = "Создание списка задач")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "201",
            description = "Список задач создан",
            content = @Content(
                schema = @Schema(implementation = TaskListDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Пользователь не найден",
            content = {}
        )
    })
    public ResponseEntity<?> createTaskLists(@RequestBody TaskListCreateRequestDTO requestDTO) {
        User owner = userService.findUserById(requestDTO.getOwner_id());
        if (owner == null)
            return ResponseEntity
                .notFound()
                .build();

        TaskListDTO taskListDTO = taskListService.createTaskList(owner, requestDTO.getTitle(), requestDTO.getIcon(), requestDTO.getColor());
        
        return ResponseEntity
            .status(201)
            .body(taskListDTO);
    }
    
    @PutMapping("/{taskList_id}")
    @Operation(description = "Обновление списка задач")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Список задач обновлен",
            content = @Content(
                schema = @Schema(implementation = TaskListDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Список не найден",
            content = {}
        )
    })
    public ResponseEntity<?> updateTaskList(@PathVariable Long taskList_id, @RequestBody TaskListUpdateRequest requestDTO) {
        TaskListDTO updatedTaskList = taskListService.updateTaskList(taskList_id, requestDTO);
        if (updatedTaskList == null)
            return ResponseEntity
                .notFound()
                .build();

        return ResponseEntity
            .ok()
            .body(updatedTaskList);
    }

    @DeleteMapping("/{taskList_id}")
    public ResponseEntity<?> deleteTaskList(@PathVariable Long taskList_id) {
        taskListService.deleteTaskListById(taskList_id);

        return ResponseEntity
            .status(204)
            .body(null);
    }
}
