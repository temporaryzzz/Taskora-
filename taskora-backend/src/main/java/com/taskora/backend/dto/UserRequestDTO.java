package com.taskora.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Запрашиваемый пользователь")
public class UserRequestDTO extends UserDTO {

    @Schema(description = "Пароль пользователя должен содержать от 8 до 32 символов" , example = "n1ot5ver7yh2ard")
    @NotBlank
    @Size(min = 8, max = 32)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
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
