package com.taskora.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Сообщение об ошибке")
public class ErrorMessageDTO {
    
    @Schema(description = "Сообщение об ошибке", example = "Пользователь уже существует")
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
