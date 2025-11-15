package com.taskora.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskora.backend.dto.ErrorMessageDTO;
import com.taskora.backend.dto.SignInRequestDTO;
import com.taskora.backend.dto.SignUpRequestDTO;
import com.taskora.backend.dto.UserDTO;
import com.taskora.backend.entity.User;
import com.taskora.backend.security.JwtUtil;
import com.taskora.backend.service.TaskListService;
import com.taskora.backend.service.UserService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthenticationController {

    @Autowired
    private AuthenticationManager authManager;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private UserService userService;

    @Autowired
    private TaskListService taskListService;


    @PostMapping("/signup")
    @Operation(description = "Регистрация пользователя в БД, с проверкой на занятость логина")
    @ApiResponses( value = {
        @ApiResponse(
            responseCode = "200",
            description = "Успешная регистрация",
            content = @Content(
                schema = @Schema(implementation = UserDTO.class)
            )
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
        if (userService.isUserExistsByEmail(requestDTO.getEmail()))
            return ResponseEntity
                    .status(409)
                    .body(new ErrorMessageDTO("Пользователь с данным email уже существует"));
        
        if (userService.isUserExistsByUsername(requestDTO.getUsername()))
            return ResponseEntity
                    .status(409)
                    .body(new ErrorMessageDTO("Пользователь с данным username уже существует"));

        UserDTO userResponseDTO = userService.createUser(requestDTO);

        User new_user = userService.findUserById(userResponseDTO.getId());
        taskListService.createTaskList(new_user, "Default", "DEFAULT", "DEFAULT");

        return ResponseEntity
                .ok()
                .body(userResponseDTO);
    }
    
    
    @PostMapping("/signin")
    @Operation(description = "Авторизация пользователя в систему")
    @ApiResponses( value = {
        @ApiResponse(
            responseCode = "200",
            description = "Успешный вход",
            content = @Content(
                schema = @Schema(implementation = UserDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "400",
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
            UserDetails userDetails = (UserDetails) authentication.getPrincipal();
            
            return ResponseEntity
                .ok()
                .body(jwtUtil.generateToken(userDetails.getUsername()));
        } catch (Exception e) {
            System.err.println("Ошибка при попытке авторизации: " + e);
        }
        
        // Если логин или пароль неверны
        return ResponseEntity
            .badRequest()
            .body(new ErrorMessageDTO("Неверный логин или пароль"));
    }
}
