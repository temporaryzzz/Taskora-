package com.taskora.backend.dto;

import java.util.Date;

public class TaskDTO {
    
    Long id;
    String title;
    String description;
    Date due_date;
    Priority priority = Priority.MIDDLE;
    Boolean completed;
    
    
    public TaskDTO(Long id, String title, String description, Date due_date, Priority priority, Boolean completed) {
        this.id = id;
        this.title = title;
        this.description = description;
        this.due_date = due_date;
        this.priority = priority;
        this.completed = completed;
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
    public String getDescription() {
        return description;
    }
    public void setDescription(String description) {
        this.description = description;
    }
    public Date getDue_date() {
        return due_date;
    }
    public void setDue_date(Date due_date) {
        this.due_date = due_date;
    }
    public Priority getPriority() {
        return priority;
    }
    public void setPriority(Priority priority) {
        this.priority = priority;
    }
    public Boolean getCompleted() {
        return completed;
    }
    public void setCompleted(Boolean completed) {
        this.completed = completed;
    }
}
