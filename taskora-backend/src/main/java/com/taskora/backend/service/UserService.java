package com.taskora.backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.taskora.backend.dto.SignRequestDTO;
import com.taskora.backend.dto.UserDTO;
import com.taskora.backend.entity.User;
import com.taskora.backend.repository.UserRepository;
import com.taskora.backend.utils.ResponseDTO;

@Service
public class UserService {

    // [fix] почему то при шифровании пароля нужно явно указывать, что он {bcrypt}
    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private UserRepository repository;


    /**
     * Создает пользователя
     * 
     * @param requestDTO - {@code username}, {@code email}, {@code password}
     * @return {@link UserDTO} созданного пользователя
     */
    public UserDTO createUser(SignRequestDTO requestDTO) {
        User user = new User();
        user.setUsername(requestDTO.getUsername());
        user.setEmail(requestDTO.getEmail());
        user.setPassword("{bcrypt}" + passwordEncoder.encode(requestDTO.getPassword()));

        repository.save(user);
        ResponseDTO responseDTO = new ResponseDTO();
        
        return responseDTO.fromUserEntityToDTO(user);
    }

    /**
     * Находит пользователя по {@code id}
     * 
     * @param id пользователя
     * @return {@link User} найденного пользователя; {@code null}, если пользователь не найден
     */
    public User findUserById(Long id) {
        User user = repository.findById(id)
            .orElse(null);
        
        return user;
    }

    /**
     * Находит пользователя по {@code email}
     * 
     * @param email пользователя
     * @return {@link User} найденного пользователя; {@code null}, если пользователь не найден
     */
    public User findUserByEmail(String email) {
        Optional<User> user = repository.findByEmail(email);
        if (!user.isPresent())
            return null;

        return user.get();
    }

    /**
     * Находит пользователя по {@code username}
     * 
     * @param username пользователя
     * @return {@link User} найденного пользователя; {@code null}, если пользователь не найден
     */
    public User findUserByUsername(String username) {
        Optional<User> user = repository.findByUsername(username);
        if (!user.isPresent())
            return null;
        
        return user.get();
    }

    /**
     * Находит всех пользователей
     * 
     * @return {@code List<User>} всех пользователей; пустой список, если пользователи не найдены
     */
    public List<User> findAllUsers() {
        List<User> users = new ArrayList<>();
        users.addAll(repository.findAll());

        return users;
    }

    /**
     * Обновляет пользователя по его {@code id}
     * 
     * @param id обновляемого пользователя
     * @param requestDTO - DTO с данными для замены
     * @return {@link UserDTO} обновленного пользователя; {@code null}, если пользователь не найден
     */
    public UserDTO updateUser(Long id, SignRequestDTO requestDTO) {
        User user = repository.findById(id)
            .orElse(null);

        user.setUsername(requestDTO.getUsername());
        user.setEmail(requestDTO.getEmail());
        user.setPassword("{bcrypt}" + passwordEncoder.encode(requestDTO.getPassword()));
        user.setUpdated_at(LocalDateTime.now());

        repository.save(user);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromUserEntityToDTO(user);
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    public boolean isUserExistsByEmail(String email) {
        if (repository.existsByEmail(email)) 
            return true;

        return false;
    }

    public boolean isUserExistsByUsername(String username) {
        if (repository.existsByUsername(username))
            return true;

        return false;
    }
}
