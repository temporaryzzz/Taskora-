package com.taskora.backend.service;

import java.util.Collections;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

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
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with email: " + login));
        } else {
            user = repository.findByUsername(login)
                    .orElseThrow(() -> new UsernameNotFoundException("User not found with username: " + login));
        }


        return new org.springframework.security.core.userdetails.User(
            user.getUsername(), 
            user.getPassword(),
            Collections.emptyList()
        );
    }
}
