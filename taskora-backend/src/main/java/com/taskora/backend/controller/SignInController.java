package com.taskora.backend.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskora.backend.dto.ErrorMessageDTO;
import com.taskora.backend.dto.UserRequestDTO;
import com.taskora.backend.entity.User;
import com.taskora.backend.service.UserService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;


@RestController
@RequestMapping("/api/signin")
public class SignInController {
    
    private final UserService userService;
    
    public SignInController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/")
    public ResponseEntity<?> signin(@RequestBody UserRequestDTO requestDTO) {
        if (requestDTO.isEmailEmpty() && userService.isUserExistsByUsername(requestDTO)) {
            User user = userService.findUserByUsername(requestDTO.getUsername());
            
            if (user.getPassword().equals((requestDTO.getPassword())))
                return ResponseEntity
                    .status(200)
                    .body(null);
        }

        if (userService.isUserExistsByEmail(requestDTO)) {
            User user = userService.findUserByEmail(requestDTO.getEmail());

            if (user.getPassword().equals((requestDTO.getPassword())))
                return ResponseEntity
                    .status(200)
                    .body(null);
        }
        
        return ResponseEntity
            .status(400)
            .body(new ErrorMessageDTO(400, "Неверный логин или пароль"));
    }
}
