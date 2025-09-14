package com.taskora.backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.NoSuchElementException;

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

    public UserDTO createUser(UserRequestDTO requestDTO) {
        User user = new User();
        user.setUsername(requestDTO.getUsername());
        user.setEmail(requestDTO.getEmail());
        user.setPassword(requestDTO.getPassword());

        repository.save(user);
        ResponseDTO responseDTO = new ResponseDTO();
        
        return responseDTO.fromUserEntity(user);
    }

    public User findUserById(Long id) {
        User user = repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Пользователя с id " + id + " не найдено!")
        );
        
        return user;
    }

    public List<UserDTO> findAllUsers() {
        List<User> users = new ArrayList<>();
        users.addAll(repository.findAll());

        if (users.isEmpty())
            return new ArrayList<UserDTO>();

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromUserEntityList(users);
    }

    public UserDTO updateUser(Long id, UserRequestDTO requestDTO) {
        User user = repository.findById(id)
            .orElseThrow(() -> new NoSuchElementException("Пользователя с id " + id + " не найдено!")
        );

        user.setUsername(requestDTO.getUsername());
        user.setEmail(requestDTO.getEmail());
        user.setPassword(requestDTO.getPassword());
        user.setUpdated_at(LocalDateTime.now());

        repository.save(user);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromUserEntity(user);
    }

    public void deleteUser(Long id) {
        repository.deleteById(id);
    }

    public boolean isUserExists(UserRequestDTO requestDTO) {
        if (repository.existsByEmail(requestDTO.getEmail())) 
            return true;

        return false;
    }
}
