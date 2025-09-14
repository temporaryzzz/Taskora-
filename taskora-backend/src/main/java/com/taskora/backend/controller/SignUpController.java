package com.taskora.backend.controller;

import org.springframework.http.ResponseEntity;
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
@RequestMapping("/api/signup")
public class SignUpController {
    private final UserService userService;
    private final TaskListService taskListService;

    public SignUpController(UserService userService, TaskListService taskListService) {
        this.userService = userService;
        this.taskListService = taskListService;
    }

    @PostMapping("/")
    public ResponseEntity<?> signUp(@RequestBody UserRequestDTO requestDTO) {
        if (userService.isUserExists(requestDTO))
            return ResponseEntity
                    .status(409)
                    .body(new ErrorMessageDTO(409, "Пользователь с данным email уже существует"));

        UserDTO userResponseDTO = userService.createUser(requestDTO);

        User newUser = userService.findUserById(userResponseDTO.getId());
        taskListService.createTaskList(newUser);

        return ResponseEntity
                .ok()
                .body(userResponseDTO);
    }
}
