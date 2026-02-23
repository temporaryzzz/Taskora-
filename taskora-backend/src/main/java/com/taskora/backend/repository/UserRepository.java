package com.taskora.backend.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.taskora.backend.entity.User;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    Optional<User> findByUsername(String username);  
    
    /**
     * Находит пользователя по имени пользователя ИЛИ по email.
     * 
     * @param login - строка, которая может быть именем пользователя или email.
     * @return 
     */
    @Query("SELECT u FROM User u WHERE u.username = :login OR u.email = :login")
    Optional<User> findByLogin(@Param("login") String login);

    boolean existsByEmail(String email);
    boolean existsByUsername(String username);
}
