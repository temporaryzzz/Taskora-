package com.taskora.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;

@Schema(description = "Запрос на создание задачи")
public class TaskCreateRequestDTO {
    
    @Schema(description = "Id списка в котором лежит задача")
    Long taskList_id;

    @Schema(description = "Название задачи, от 1 до 50 символов", example = "task 1")
    @Size(min = 1, max = 50)
    String title;

    
    public TaskCreateRequestDTO(Long taskList_id, @Size(min = 1, max = 50) String title) {
        this.taskList_id = taskList_id;
        this.title = title;
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
}
