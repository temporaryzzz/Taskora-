package com.taskora.backend.dto;

public class TaskListDTO {
    
    Long id;
    Long owner_id;
    String title;
    

    public TaskListDTO(Long id, Long owner_id, String title) {
        this.id = id;
        this.owner_id = owner_id;
        this.title = title;
    }


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
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
