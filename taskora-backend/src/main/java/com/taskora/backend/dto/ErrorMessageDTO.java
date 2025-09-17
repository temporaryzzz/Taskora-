package com.taskora.backend.dto;

public class ErrorMessageDTO {
    
    String message;


    public ErrorMessageDTO(String message) {
        this.message = message;
    }

    
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }
       
}
