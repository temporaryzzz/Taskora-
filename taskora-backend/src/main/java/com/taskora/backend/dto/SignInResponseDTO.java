package com.taskora.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Ответ с данными о пользователе и токеном аутентификации")
public class SignInResponseDTO {

    @Schema(description = "JWT токен")
    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    String authorization;

    
    public SignInResponseDTO(String authorization) {
        this.authorization = authorization;
    }


    public String getAuthorization() {
        return authorization;
    }

    public void setAuthorization(String authorization) {
        this.authorization = authorization;
    }
}
