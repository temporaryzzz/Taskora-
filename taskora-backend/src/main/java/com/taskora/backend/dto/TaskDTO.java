package com.taskora.backend.dto;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Данные о задаче")
public class TaskDTO {
    
    @Schema(description = "Уникальный id задачи в БД")
    Long id;

    @JsonProperty("ownerListId")
    @Schema(description = "Id списка в котором лежит задача")
    Long taskListId;

    @Schema(description = "Назавние секции, в которой лежит задача")
    String section;

    @Schema(description = "Название задачи", example = "task 1")
    String title;

    @Schema(description = "Описание задачи", example = "Создать task 2.")
    String description;

    @JsonProperty("deadline")
    @Schema(description = "Дедлайн задачи")
    Instant dueDate;

    @Schema(description = "Приоритет задачи", example = "DEFAULT")
    String priority = "DEFAULT";

    @Schema(description = "Выполнена ли задача", example = "false")
    boolean completed;


    public TaskDTO(Long id, Long taskListId, String section, String title, String description, Instant dueDate,
            String priority, boolean completed) {
        this.id = id;
        this.taskListId = taskListId;
        this.section = section;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getTaskListId() {
        return taskListId;
    }

    public void setTaskListId(Long taskListId) {
        this.taskListId = taskListId;
    }

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
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

    public Instant getDueDate() {
        return dueDate;
    }

    public void setDueDate(Instant dueDate) {
        this.dueDate = dueDate;
    }

    public String getPriority() {
        return priority;
    }

    public void setPriority(String priority) {
        this.priority = priority;
    }

    public Boolean getCompleted() {
        return completed;
    }

    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
