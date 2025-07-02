package com.taskora.backend.controller;

import com.taskora.backend.model.dto.TaskDto;
import com.taskora.backend.service.TaskServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

// to_change: большая часть контроллера - кривая хренотень для теста
@RestController
public class TaskController {

    private final TaskServiceImpl taskService;

    public TaskController(TaskServiceImpl taskService) {
        this.taskService = taskService;
    }

    // to_change: проверено, работает
    @GetMapping(value = "test/getAll")
    public ResponseEntity<List<TaskDto>> getAllTasks() {
        List<TaskDto> tasks = taskService.getAllTasks();

        return new ResponseEntity<>(tasks, HttpStatus.OK);
    }

    // to_change: проверено, работает
    @GetMapping(value = "test/create")
    public ResponseEntity<?> create(@RequestParam(value = "title") String title, @RequestParam(value = "description", defaultValue = "") String description) {
        taskService.createTask(new TaskDto(title, description));

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    // to_change: Method not Allowed: 405
    @DeleteMapping(value = "test/delete")
    public ResponseEntity<?> delete(@RequestParam(value = "id") Long id) {

        return new ResponseEntity<>(HttpStatus.OK);
    }
}
