package com.taskora.backend.entity;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;

@Entity
public class Settings {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    Long id;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "user_id")
    User user;

    @Column(columnDefinition = "BOOLEAN DEFAULT true")
    Boolean dark_mode;

    @Column(columnDefinition = "BOOLEAN DEFAULT false")
    Boolean notifications_enabled;

    
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
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
