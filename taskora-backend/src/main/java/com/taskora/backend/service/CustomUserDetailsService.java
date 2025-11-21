package com.taskora.backend.service;

import java.nio.file.attribute.UserPrincipalNotFoundException;
import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.taskora.backend.dto.CustomUserDetails;
import com.taskora.backend.entity.User;
import com.taskora.backend.repository.UserRepository;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository repository;


    @Override
    public UserDetails loadUserByUsername(String login) throws UsernameNotFoundException {
        User user;
        
        if (login.contains("@")) {
            user = repository.findByEmail(login)
                    .orElseThrow(() -> new UsernameNotFoundException("Пользователь с email: " + login + " не найден"));
        } else {
            user = repository.findByUsername(login)
                    .orElseThrow(() -> new UsernameNotFoundException("Пользователь с username: " + login + " не найден"));
        }

        return new CustomUserDetails(
            user.getId(),
            user.getUsername(), 
            user.getPassword(),
            Collections.emptyList()
        );
    }

    public UserDetails loadUserById(Long id) throws UserPrincipalNotFoundException {
        User user = repository.findById(id)
            .orElseThrow(() -> new UsernameNotFoundException("Пользователь с id: " + id + " не найден"));

        return new CustomUserDetails(
            id,
            user.getUsername(), 
            user.getPassword(),
            Collections.emptyList()
        );
    }
}
