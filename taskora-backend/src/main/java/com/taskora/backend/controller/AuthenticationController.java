package com.taskora.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseCookie;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskora.backend.dto.CustomUserDetails;
import com.taskora.backend.dto.ErrorMessageDTO;
import com.taskora.backend.dto.SignInRequestDTO;
import com.taskora.backend.dto.SignInResponseDTO;
import com.taskora.backend.dto.SignUpRequestDTO;
import com.taskora.backend.security.JwtUtil;
import com.taskora.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = {"http://localhost:3000", "http://127.0.0.1:3000"}, allowCredentials = "true")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;


    @PostMapping("/signup")
    @Operation(description = "Регистрация пользователя в БД, с проверкой на занятость логина")
    @ApiResponses( value = {
        @ApiResponse(
            responseCode = "200",
            description = "Успешная регистрация",
            content = {}
        ),
        @ApiResponse(
            responseCode = "409",
            description = "Пользователь уже существует",
            content = @Content(
                schema = @Schema(implementation = ErrorMessageDTO.class)
            )
        )
    })
    public ResponseEntity<?> signUp(@RequestBody SignUpRequestDTO requestDTO) {
        userService.createUser(requestDTO);

        return ResponseEntity
                .ok()
                .build();
    }
    
    
    @PostMapping("/signin")
    @Operation(description = "Авторизация пользователя в систему")
    @ApiResponses( value = {
        @ApiResponse(
            responseCode = "200",
            description = "Успешный вход",
            content = @Content(
                schema = @Schema(implementation = SignInResponseDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "401",
            description = "Неверный логин или пароль",
            content = @Content(
                schema = @Schema(implementation = ErrorMessageDTO.class)
            )
        )
    })
    public ResponseEntity<?> signIn(@RequestBody SignInRequestDTO requestDTO) {        
        try {
            Authentication authentication = authManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    requestDTO.getLogin(),
                    requestDTO.getPassword())
            );
            
            CustomUserDetails userDetails = (CustomUserDetails) authentication.getPrincipal();
            String token = jwtUtil.generateToken(userDetails.getId());

            ResponseCookie cookie = ResponseCookie.from("token", token)
                .httpOnly(true)
                .secure(false)
                .sameSite("Lax")
                .path("/")
                .maxAge(30 * 24 * 3600)
                .domain("localhost")
                .build();

            return ResponseEntity
                .ok()
                .header(HttpHeaders.SET_COOKIE, cookie.toString())
                .body(new SignInResponseDTO("Вход успешен"));
        } catch (Exception e) {
            System.err.println("Ошибка при попытке авторизации: " + e);
        }
        
        return ResponseEntity
            .status(401)
            .body(new ErrorMessageDTO("Неверный логин или пароль"));
    }
}
