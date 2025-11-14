package com.taskora.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public class TaskListDTO {
    
    Long id;

    @JsonProperty("ownerUserId")
    Long owner_id;

    String title;
    // String[] sections;
    String icon;
    String color;


    public TaskListDTO(Long id, Long owner_id, String title, String icon, String color) {
        this.id = id;
        this.owner_id = owner_id;
        this.title = title;
        this.icon = icon;
        this.color = color;
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
