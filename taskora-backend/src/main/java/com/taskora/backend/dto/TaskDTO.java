package com.taskora.backend.dto;

import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Задача")
public class TaskDTO {
    
    @Schema(description = "Уникальный id задачи в БД")
    Long id;

    @JsonProperty("ownerUserId")
    Long ownerId;

    @JsonProperty("ownerListId")
    @Schema(description = "Id списка в котором лежит задача")
    Long taskListId;

    @Schema(description = "Название задачи", example = "task 1")
    String title;

    @Schema(description = "Описание задачи", example = "Создать task 2.")
    String description;

    @Schema(description = "Назавние секции, в которой лежит задача")
    String section;

    @JsonProperty("deadline")
    @Schema(description = "Дедлайн задачи")
    LocalDateTime dueDate;

    @Schema(description = "Приоритет задачи", example = "DEFAULT")
    String priority = "DEFAULT";

    @Schema(description = "Выполнена ли задача", example = "false")
    Boolean completed;

    @Schema(description = "Удалена ли задача", example = "false")
    Boolean deleted;


    /**
     * Старый конструктор сохраненный до изменений
     */
    @Deprecated
    public TaskDTO(Long id, Long taskListId, String title, String description, LocalDateTime dueDate, String priority,
            Boolean completed) {
        this.id = id;
        this.taskListId = taskListId;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
    }

    public TaskDTO(Long id, Long ownerId, Long taskListId, String title, String description, String section,
            LocalDateTime dueDate, String priority, Boolean completed, Boolean deleted) {
        this.id = id;
        this.ownerId = ownerId;
        this.taskListId = taskListId;
        this.title = title;
        this.description = description;
        this.section = section;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = completed;
        this.deleted = deleted;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getOwnerId() {
        return ownerId;
    }

    public void setOwnerId(Long ownerId) {
        this.ownerId = ownerId;
    }

    public Long getTaskListId() {
        return taskListId;
    }

    public void setTaskListId(Long taskListId) {
        this.taskListId = taskListId;
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

    public String getSection() {
        return section;
    }

    public void setSection(String section) {
        this.section = section;
    }

    public LocalDateTime getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDateTime dueDate) {
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

    public Boolean getDeleted() {
        return deleted;
    }

    public void setDeleted(Boolean deleted) {
        this.deleted = deleted;
    }
}
