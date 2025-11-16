package com.taskora.backend.dto;

import java.time.Instant;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;

@Schema(description = "Запрос на создание задачи")
public class TaskCreateRequestDTO {
    
    @JsonProperty("ownerListId")
    @Schema(description = "Id списка в котором лежит задача")
    @NotBlank
    Long taskListId;

    @Schema(description = "Назавние секции, в которой лежит задача")
    String section;

    @Schema(description = "Название задачи", example = "task 1")
    @NotBlank
    String title;

    @Schema(description = "Описание задачи", example = "Создать task 2.")
    String description;

    @JsonProperty("deadline")
    @Schema(description = "Дедлайн задачи")
    Instant dueDate;

    @Schema(description = "Приоритет задачи", example = "DEFAULT")
    @NotBlank
    String priority = "DEFAULT";


    public TaskCreateRequestDTO(@NotBlank Long taskListId, String section, @NotBlank String title, String description,
            Instant dueDate, @NotBlank String priority) {
        this.taskListId = taskListId;
        this.section = section;
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
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
}
