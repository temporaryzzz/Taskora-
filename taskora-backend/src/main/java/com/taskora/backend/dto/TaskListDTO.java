package com.taskora.backend.dto;

import java.util.List;

import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.persistence.Column;

public class TaskListDTO {
    
    @Schema(description = "Id списка задач")
    Long id;

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


    public TaskListDTO(Long id, String title, List<String> sections, String icon, String color,
            String viewType) {
        this.id = id;
        this.title = title;
        this.sections = sections;
        this.icon = icon;
        this.color = color;
        this.viewType = viewType;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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

    public List<String> getSections() {
        return sections;
    }

    public void setSections(List<String> sections) {
        this.sections = sections;
    }

    public String getViewType() {
        return viewType;
    }

    public void setViewType(String viewType) {
        this.viewType = viewType;
    }
}
