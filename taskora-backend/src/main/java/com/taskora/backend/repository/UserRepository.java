package com.taskora.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.taskora.backend.entity.User;

public interface UserRepository extends JpaRepository<User, Long> {
    boolean existsByEmail(String email);
}
