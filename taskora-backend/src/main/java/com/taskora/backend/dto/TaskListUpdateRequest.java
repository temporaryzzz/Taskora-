package com.taskora.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;

@Schema(description = "Запрос на создание списка задач")
public class TaskListUpdateRequest {
    
    @Schema(description = "Название списка задач от 3 до 25 символов")
    @Size(min = 3, max = 25)
    String title;

    
    public TaskListUpdateRequest(@Size(min = 3, max = 25) String title) {
        this.title = title;
    }


    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
