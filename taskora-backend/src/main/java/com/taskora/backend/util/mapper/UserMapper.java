package com.taskora.backend.util.mapper;

import com.taskora.backend.model.dto.UserDto;
import com.taskora.backend.model.entity.User;

public class UserMapper {

    public User toEntity(UserDto userDto) {
        return new User(
                userDto.getUsername(),
                userDto.getEmail(),
                userDto.getPassword()
        );
    }
}
