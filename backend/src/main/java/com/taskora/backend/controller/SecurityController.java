package com.taskora.backend.controller;

import com.taskora.backend.model.dto.UserDto;
import com.taskora.backend.model.entity.User;
import com.taskora.backend.repository.UserRepository;
import com.taskora.backend.security.JwtCore;
import com.taskora.backend.service.UserServiceImpl;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/auth")
public class SecurityController {

    private UserServiceImpl userService;
    private AuthenticationManager authenticationManager;
    private JwtCore jwtCore;

    public SecurityController(UserServiceImpl userService, AuthenticationManager authenticationManager, JwtCore jwtCore) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
        this.jwtCore = jwtCore;
    }

    public void setUserService(UserServiceImpl userService) {
        this.userService = userService;
    }

    public void setAuthenticationManager(AuthenticationManager authenticationManager) {
        this.authenticationManager = authenticationManager;
    }

    public void setJwtCore(JwtCore jwtCore) {
        this.jwtCore = jwtCore;
    }


    @PostMapping("/signup")
    public ResponseEntity<?> signup(@RequestBody UserDto userDto) {
        if (userService.existsUserByUsername(userDto.getUsername()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Данное имя занято");

        if (userService.existsUserByEmail(userDto.getEmail()))
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Данная почта занята");

        userService.createUser(userDto);

        return ResponseEntity.ok("Регистрация успешна");
    }

    @PostMapping("/signin")
    public ResponseEntity<?> signin(@RequestBody UserDto userDto) {
        Authentication authentication = null;

        try {
            authentication = authenticationManager.authenticate(new UsernamePasswordAuthenticationToken(userDto.getUsername(), userDto.getPassword()));
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Пользователь не найден");
        }

        SecurityContextHolder.getContext().setAuthentication(authentication);

        return ResponseEntity.ok(jwtCore.generateToken(authentication));

    }
}
