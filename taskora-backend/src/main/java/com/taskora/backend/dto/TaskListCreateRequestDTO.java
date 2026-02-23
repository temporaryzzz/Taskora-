package com.taskora.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Запрос на создание списка задач")
public class TaskListCreateRequestDTO {

    @Schema(description = "Название списка задач")
    String title;

    @Schema(description = "Название иконки списка", example = "DEFAULT")
    String icon;

    @Schema(description = "Цвет иконки", example = "DEFAULT")
    String color;

    @Schema(description = "Тип отображения задач в списке", example = "KANBAN")
    String viewType;


    public TaskListCreateRequestDTO(String title, String icon, String color, String viewType) {
        this.title = title;
        this.icon = icon;
        this.color = color;
        this.viewType = viewType;
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

    public void setColor(String color) {
        this.color = color;
    }

    public String getViewType() {
        return viewType;
    }

    public void setViewType(String viewType) {
        this.viewType = viewType;
    }
}
