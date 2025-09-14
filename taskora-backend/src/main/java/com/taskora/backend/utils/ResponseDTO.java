package com.taskora.backend.utils;

import java.util.List;

import com.taskora.backend.dto.SettingsDTO;
import com.taskora.backend.dto.TaskDTO;
import com.taskora.backend.dto.TaskListDTO;
import com.taskora.backend.dto.UserDTO;
import com.taskora.backend.entity.Settings;
import com.taskora.backend.entity.Task;
import com.taskora.backend.entity.TaskList;
import com.taskora.backend.entity.User;

public class ResponseDTO {
    
    public UserDTO fromUserEntity(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail());
    }

    public List<UserDTO> fromUserEntityList(List<User> users) {
        return users.stream()
            .map(this::fromUserEntity)
            .toList();
    }

    public TaskListDTO fromTaskListEntity(TaskList taskList) {
        return new TaskListDTO(taskList.getId(), taskList.getOwner().getId(), taskList.getTitle());
    }

    public TaskDTO fromTaskEntity(Task task) {
        return new TaskDTO(task.getId(), task.getTitle(), task.getDescription(), task.getDue_date(), task.getPriority(), task.getCompleted());
    }

    public SettingsDTO fromSettingsEntity(Settings settings) {
        return new SettingsDTO(settings.getDark_mode(), settings.getNotifications_enabled());
    }
}
