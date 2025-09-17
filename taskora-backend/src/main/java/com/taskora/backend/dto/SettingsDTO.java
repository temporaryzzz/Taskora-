package com.taskora.backend.dto;

public class SettingsDTO {
    
    Boolean dark_mode;
    Boolean notifications_enabled;


    public SettingsDTO(Boolean dark_mode, Boolean notifications_enabled) {
        this.dark_mode = dark_mode;
        this.notifications_enabled = notifications_enabled;
    }


    public Boolean getDark_mode() {
        return dark_mode;
    }

    public void setDark_mode(Boolean dark_mode) {
        this.dark_mode = dark_mode;
    }

    public Boolean getNotifications_enabled() {
        return notifications_enabled;
    }

    public void setNotifications_enabled(Boolean notifications_enabled) {
        this.notifications_enabled = notifications_enabled;
    }
}
