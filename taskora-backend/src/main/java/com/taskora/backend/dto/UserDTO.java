package com.taskora.backend.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Пользователь")
public class UserDTO {

    @Schema(description = "Никнейм пользователя должен содержать от 3 до 16 символов", example = "user123")
    @NotBlank
    @Size(min = 3, max = 16)
    String username;

    @Schema(description = "Почтовый адрес пользователя должен содержать от 6 до 64 символов, также включать @ и домен", example = "email@domain.com")
    @NotBlank
    @Size(min = 6, max = 64)
    String email;


    public UserDTO(@NotBlank @Size(min = 3, max = 16) String username,
            @NotBlank @Size(min = 6, max = 64) String email) {
        this.username = username;
        this.email = email;
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
}
