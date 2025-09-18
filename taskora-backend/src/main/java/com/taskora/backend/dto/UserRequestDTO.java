package com.taskora.backend.dto;

public class UserRequestDTO extends UserDTO {

    String password;

    public UserRequestDTO(Long id, String username, String email, String password) {
        super(id, username, email);
        this.password = password;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }    
}
