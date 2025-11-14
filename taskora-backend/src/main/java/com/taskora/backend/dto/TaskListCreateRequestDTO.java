package com.taskora.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;

@Schema(description = "Запрос на создание списка задач")
public class TaskListCreateRequestDTO {

    @JsonProperty("ownerUserId")
    @Schema(description = "Id пользователя")
    Long owner_id;

    @Schema(description = "Название списка задач от 3 до 25 символов")
    @Size(min = 3, max = 25)
    String title;

    // new
    String[] sections;

    @Schema(description = "Название иконки списка", example = "DEFAULT")
    String icon;

    @Schema(description = "Цвет иконки", example = "DEFAULT")
    String color;


    public TaskListCreateRequestDTO(Long owner_id, @Size(min = 3, max = 25) String title, String icon,
            String iconColor) {
        this.owner_id = owner_id;
        this.title = title;
        this.icon = icon;
        this.color = iconColor;
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

    public String getIcon() {
        return icon;
    }

    public void setIcon(String icon) {
        this.icon = icon;
    }

    public String getColor() {
        return color;
    }

    public void setColor(String iconColor) {
        this.color = iconColor;
    }
}
