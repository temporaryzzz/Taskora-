package com.taskora.backend.dto;

public class UserDTO {
    
    Long user_id;
    String username;
    String email;
    
    
    public UserDTO(Long user_id, String username, String email) {
        this.user_id = user_id;
        this.username = username;
        this.email = email;
    }

    
    public Long getId() {
        return user_id;
    }
    public void setId(Long user_id) {
        this.user_id = user_id;
    }
    public String getUsername() {
        return username;
    }
    public void setUsername(String username) {
        this.username = username;
    }
    public String getEmail() {
        return email;
    }
    public void setEmail(String email) {
        this.email = email;
    }


    public boolean isEmailEmpty() {
        return (email == null);
    }
}
