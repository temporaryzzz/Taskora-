package com.taskora.backend.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.taskora.backend.dto.ErrorMessageDTO;
import com.taskora.backend.dto.UserDTO;
import com.taskora.backend.service.UserService;
import com.taskora.backend.utils.SecurityUtils;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;

import org.springframework.web.bind.annotation.GetMapping;


@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class UserController {
    
    @Autowired
    UserService userService;


    @GetMapping("")
    @Operation(description = "Получение username и email пользователя")
    @ApiResponses(value = {
        @ApiResponse(
            responseCode = "200",
            description = "Информация найдена",
            content = @Content(
                schema = @Schema(implementation = UserDTO.class) 
            )
        ),
        @ApiResponse(
            responseCode = "403",
            description = "Доступ запрещен",
            content = @Content(
                schema = @Schema(implementation = ErrorMessageDTO.class)
            )
        ),
        @ApiResponse(
            responseCode = "404",
            description = "Пользователь не найден",
            content = {}
        )
    })
    public ResponseEntity<?> getUserDetails() {
        UserDTO userDetails = userService.findUserDetailsById(SecurityUtils.getCurrentUserId());

        return ResponseEntity
            .ok()
            .body(userDetails);
    }
    
}
