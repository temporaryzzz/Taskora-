package com.taskora.backend.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskora.backend.dto.ErrorMessageDTO;
import com.taskora.backend.dto.UserDTO;
import com.taskora.backend.dto.UserRequestDTO;
import com.taskora.backend.entity.User;
import com.taskora.backend.service.TaskListService;
import com.taskora.backend.service.UserService;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class AuthenticationController {

    private final UserService userService;
    private final TaskListService taskListService;
    
    
    public AuthenticationController(UserService userService, TaskListService taskListService) {
        this.userService = userService;
        this.taskListService = taskListService;
    }


    /**
     * Регистрация пользователя в БД, с проверкой на занятость логина
     * 
     * @param requestDTO - {@code username}, {@code email}, {@code password}
     * @return 200 если регистрация успешна; 409 с сообщением об ошибке, если {@code email} или {@code username} занят
     */
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody UserRequestDTO requestDTO) {
        if (userService.isUserExistsByEmail(requestDTO))
            return ResponseEntity
                    .status(409)
                    .body(new ErrorMessageDTO("Пользователь с данным email уже существует"));
        
        if (userService.isUserExistsByUsername(requestDTO))
            return ResponseEntity
                    .status(409)
                    .body(new ErrorMessageDTO("Пользователь с данным username уже существует"));

        UserDTO userResponseDTO = userService.createUser(requestDTO);

        User newUser = userService.findUserById(userResponseDTO.getId());
        taskListService.createTaskList(newUser);

        return ResponseEntity
                .ok()
                .body(userResponseDTO);
    }
    
    /**
     * Авторизация пользователя в систему.
     * 
     * @param requestDTO - {@code username} или {@code email}, {@code password}
     * @return 200 если пользователь найден и пароль верный; иначе 400
     */
    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody UserRequestDTO requestDTO) {
        if (requestDTO.isEmailEmpty() && userService.isUserExistsByUsername(requestDTO)) {
            User user = userService.findUserByUsername(requestDTO.getUsername());

            
            if (user.getPassword().equals((requestDTO.getPassword())))
                return ResponseEntity
                    .ok()
                    .body(new UserDTO(user.getId(), user.getUsername(), user.getEmail()));
        }

        if (userService.isUserExistsByEmail(requestDTO)) {
            User user = userService.findUserByEmail(requestDTO.getEmail());

            if (user.getPassword().equals((requestDTO.getPassword())))
                return ResponseEntity
                    .ok()
                    .body(new UserDTO(user.getId(), user.getUsername(), user.getEmail()));
        }
        
        return ResponseEntity
            .badRequest()
            .body(new ErrorMessageDTO("Неверный логин или пароль"));
    }
}
