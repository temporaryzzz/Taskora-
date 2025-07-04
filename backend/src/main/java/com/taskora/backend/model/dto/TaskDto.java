package com.taskora.backend.model.dto;

import com.taskora.backend.model.entity.Task;

/**
 * {@link Task} DTO.
 */
public class TaskDto {

    private Long id;
    private String title;
    private String description;

    // Куча полей из Task


    public TaskDto(String title, String description) {
        this.title = title;
        this.description = description;
    }

    // to_change: Добавить возможность копирования, без лишнего конструктора
    public TaskDto(Long id, String title, String description) {
        this.id = id;
        this.title = title;
        this.description = description;
    }


    public Long getId() {
        return id;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
