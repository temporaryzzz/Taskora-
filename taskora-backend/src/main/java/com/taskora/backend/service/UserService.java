package com.taskora.backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.stereotype.Service;

import com.taskora.backend.dto.UserDTO;
import com.taskora.backend.dto.UserRequestDTO;
import com.taskora.backend.entity.User;
import com.taskora.backend.repository.UserRepository;
import com.taskora.backend.utils.ResponseDTO;

@Service
public class UserService {

    private final UserRepository repository;


    public UserService(UserRepository repository) {
        this.repository = repository;
    }

    /**
     * Создает пользователя в БД
     * 
     * @param requestDTO - {@code username}, {@code email}, {@code password}
     * @return {@link UserDTO} созданного пользователя
     */
    public UserDTO createUser(UserRequestDTO requestDTO) {
        User user = new User();
        user.setUsername(requestDTO.getUsername());
        user.setEmail(requestDTO.getEmail());
        user.setPassword(requestDTO.getPassword());

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
    public UserDTO updateUser(Long id, UserRequestDTO requestDTO) {
        User user = repository.findById(id)
            .orElse(null);

        user.setUsername(requestDTO.getUsername());
        user.setEmail(requestDTO.getEmail());
        user.setPassword(requestDTO.getPassword());
        user.setUpdated_at(LocalDateTime.now());

        repository.save(user);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromUserEntityToDTO(user);
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    public boolean isUserExistsByEmail(UserRequestDTO requestDTO) {
        if (repository.existsByEmail(requestDTO.getEmail())) 
            return true;

        return false;
    }

    public boolean isUserExistsByUsername(UserRequestDTO requestDTO) {
        if (repository.existsByUsername(requestDTO.getUsername()))
            return true;

        return false;
    }
}
