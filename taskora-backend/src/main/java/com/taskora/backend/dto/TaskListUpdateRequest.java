package com.taskora.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.Size;

@Schema(description = "Запрос на обновление списка задач")
public class TaskListUpdateRequest {
    
    @Schema(description = "Название списка задач от 3 до 25 символов")
    @Size(min = 3, max = 25)
    String title;

    @Schema(description = "Название иконки списка", example = "DEFAULT")
    String icon;

    @Schema(description = "Цвет иконки", example = "DEFAULT")
    String iconColor;


    public TaskListUpdateRequest(@Size(min = 3, max = 25) String title, String icon, String iconColor) {
        this.title = title;
        this.icon = icon;
        this.iconColor = iconColor;
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

    public String getIconColor() {
        return iconColor;
    }

    public void setIconColor(String iconColor) {
        this.iconColor = iconColor;
    }
}
