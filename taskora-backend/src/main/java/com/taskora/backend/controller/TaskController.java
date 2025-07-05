package com.taskora.backend.controller;

import com.taskora.backend.model.dto.TaskDto;
import com.taskora.backend.service.TaskServiceImpl;
import org.springframework.lang.NonNull;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// to_change: после добавления Security - заменить эндпоинты, оставив только Mapping
// to_change: добавить статус коды и хоть какие нибудь обратные сообщения, чтобы в случае чего понимать, что произошло
@RestController
@RequestMapping("/test")
public class TaskController {

    private final TaskServiceImpl taskService;

    public TaskController(TaskServiceImpl taskService) {
        this.taskService = taskService;
    }


    @GetMapping(value = "/task")
    public TaskDto getTaskById(@RequestParam Long id) {
        return taskService.getTaskById(id);
    }

    @GetMapping(value = "/tasks")
    public List<TaskDto> getAllTasks() {
        return taskService.getAllTasks();
    }

    // to_change: возвращается DTO'шка без id
    // to_change: какого то хрена первый id у задач - 52. Нужно в application.properties подшаманить скорее всего, или в @Entity
    @GetMapping(value = "/create")
    public TaskDto createTask(@RequestParam(value = "title") String title, @RequestParam(value = "description", defaultValue = "") String description) {
        return taskService.createTask(new TaskDto(title, description));
    }

    // to_change: заменить GET на PUT после тестов
    // to_change: тут тоже DTO'шка без id
    // to_change: сбивается порядок задач в новом JSON
    @GetMapping(value = "/update")
    public TaskDto updateTask(@NonNull @RequestParam(value = "id") Long id, @RequestParam(value = "title") String title, @RequestParam(value = "description", defaultValue = "") String description) {
        return taskService.updateTask(id, new TaskDto(title, description));
    }

    // to_change: заменить GET на DELETE после тестов
    @GetMapping(value = "/delete")
    public void delete(@NonNull @RequestParam(value = "id") Long id) {
        taskService.deleteTask(id);
    }
}
