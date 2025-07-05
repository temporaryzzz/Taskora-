package com.taskora.backend.controller;

import com.taskora.backend.model.entity.User;
import com.taskora.backend.repository.UserRepository;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.List;

@RestController
@RequestMapping("/user")
public class UserController {

    UserRepository userRepository;

    public UserController(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @GetMapping("/")
    public String userAccess(Principal principal) {
        if (principal == null)
            return null;

        return principal.getName();
    }

    @GetMapping("/all")
    public List<User> checkAllUsers() {
        return userRepository.findAll();
    }
}
