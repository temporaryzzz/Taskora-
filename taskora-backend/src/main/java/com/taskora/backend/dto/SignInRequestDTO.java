package com.taskora.backend.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import io.swagger.v3.oas.annotations.media.Schema;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

@Schema(description = "Запрос c данными пользователя пользователя для входа")
public class SignInRequestDTO {

    @Schema(description = "Логин пользователя должен содержать от 3 до 64 символов, может быть как именем, так и почтой", example = "email@domain.com")
    @NotBlank
    @Size(min = 3, max = 64)
    String login;

    @Schema(description = "Пароль пользователя должен содержать от 8 до 32 символов" , example = "n1ot5ver7yh2ard")
    @NotBlank
    @Size(min = 8, max = 32)
    @JsonProperty(access = JsonProperty.Access.WRITE_ONLY)
    String password;


    public SignInRequestDTO(@NotBlank @Size(min = 3, max = 64) String login,
            @NotBlank @Size(min = 8, max = 32) String password) {
        this.login = login;
        this.password = password;
    }

    
    public String getLogin() {
        return login;
    }

    public void setLogin(String login) {
        this.login = login;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
