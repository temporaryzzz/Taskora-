package com.taskora.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Ответ с данными о входе")
public class SignInResponseDTO {

    @Schema(description = "Сообщение о входе")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    String message;

    
    public SignInResponseDTO(String authorization) {
        this.message = authorization;
    }


    public String getMessage() {
        return message;
    }

    public void setMessage(String authorization) {
        this.message = authorization;
    }
}
