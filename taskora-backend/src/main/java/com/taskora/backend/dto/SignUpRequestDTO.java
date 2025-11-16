package com.taskora.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Запрос c данными пользователя пользователя для регистрации")
public class SignUpRequestDTO {
    
    @Schema(description = "Никнейм пользователя должен содержать от 3 до 16 символов", example = "user123")
    @NotBlank
    @Size(min = 3, max = 16)
    String username;

    @Schema(description = "Почтовый адрес пользователя должен содержать от 6 до 64 символов, также включать @ и домен", example = "email@domain.com")
    @NotBlank
    @Size(min = 6, max = 64)
    String email;

    @Schema(description = "Пароль пользователя должен содержать от 8 до 32 символов" , example = "n1ot5ver7yh2ard")
    @NotBlank
    @Size(min = 8, max = 32)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;

    
    public SignUpRequestDTO(@NotBlank @Size(min = 3, max = 16) String username,
            @NotBlank @Size(min = 6, max = 64) String email, @NotBlank @Size(min = 8, max = 32) String password) {
        this.username = username;
        this.email = email;
        this.password = password;
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

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
