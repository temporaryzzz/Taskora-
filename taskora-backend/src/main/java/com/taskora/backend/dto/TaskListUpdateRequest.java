package com.taskora.backend.dto;

import java.util.List;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;

// [fix] сейчас при обновлении фронт отправляет абсолютно все поля, что повышает нагрузку
@Schema(description = "Запрос на обновление списка задач")
public class TaskListUpdateRequest {
    
    @Schema(description = "Название списка задач")
    String title;

    @Schema(description = "Список названий секций", example = "[\"Main section\", \"Until Mon\"]")
    @Column(columnDefinition = "jsonb")
    @JdbcTypeCode(SqlTypes.JSON)
    List<String> sections;

    @Schema(description = "Название иконки списка", example = "DEFAULT")
    String icon;

    @Schema(description = "Цвет иконки", example = "DEFAULT")
    String color;

    @Schema(description = "Тип отображения задач в списке", example = "KANBAN")
    String viewType;


    public TaskListUpdateRequest(String title, List<String> sections, String icon, String color, String viewType) {
        this.title = title;
        this.sections = sections;
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

    public List<String> getSections() {
        return sections;
    }

    public void setSections(List<String> sections) {
        this.sections = sections;
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
