package com.taskora.backend.model.dto;

import org.springframework.lang.NonNull;

public class TaskDto {

    private String title;
    private String description;

    public TaskDto(@NonNull String title, String description) {
        this.title = title;
        this.description = description;
    }

    public TaskDto(@NonNull String title) {
        this.title = title;
    }

    public String getTitle() {
        return title;
    }

    public String getDescription() {
        return description;
    }
}
