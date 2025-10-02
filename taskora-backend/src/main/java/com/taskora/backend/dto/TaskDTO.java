package com.taskora.backend.dto;

import java.time.LocalDateTime;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Enumerated;
import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Size;

@Schema(description = "Задача")
public class TaskDTO {
    
    @Schema(description = "Уникальный id задачи в БД")
    Long id;

    @Schema(description = "Id списка в котором лежит задача")
    Long taskList_id;

    @Schema(description = "Название задачи, от 1 до 50 символов", example = "task 1")
    @Size(min = 1, max = 50)
    String title;

    @Schema(description = "Описание задачи, до 255 символов", example = "Создать task 2.")
    @Max(255)
    String description;

    @Schema(description = "Дедлайн задачи")
    LocalDateTime due_date;

    @Schema(description = "Приоритет задачи", example = "DEFAULT")
    @Enumerated
    Priority priority = Priority.DEFAULT;

    @Schema(description = "Выполнена ли задача", example = "false")
    Boolean completed;


    public TaskDTO(Long id, Long taskList_id, @Size(min = 1, max = 50) String title, @Max(255) String description,
            LocalDateTime due_date, Priority priority, Boolean completed) {
        this.id = id;
        this.taskList_id = taskList_id;
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.priority = priority;
        this.completed = completed;
    }

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTaskList_id() {
        return taskList_id;
    }
    
    public void setTaskList_id(Long taskList_id) {
        this.taskList_id = taskList_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public LocalDateTime getDue_date() {
        return due_date;
    }

    public void setDue_date(LocalDateTime due_date) {
        this.due_date = due_date;
    }

    public Priority getPriority() {
        return priority;
    }

    public void setPriority(Priority priority) {
        this.priority = priority;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
