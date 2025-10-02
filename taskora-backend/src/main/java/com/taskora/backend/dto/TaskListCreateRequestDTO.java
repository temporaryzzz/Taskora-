package com.taskora.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;

@Schema(description = "Запрос на создание списка задач")
public class TaskListCreateRequestDTO {

    @Schema(description = "Id пользователя")
    Long owner_id;

    @Schema(description = "Название списка задач от 3 до 25 символов")
    @Size(min = 3, max = 25)
    String title;


    public TaskListCreateRequestDTO(Long owner_id, String title) {
        this.owner_id = owner_id;
        this.title = title;
    }


    public Long getOwner_id() {
        return owner_id;
    }

    public void setOwner_id(Long owner_id) {
        this.owner_id = owner_id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }
}
