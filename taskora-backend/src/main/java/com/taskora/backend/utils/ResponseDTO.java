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

/**
 * Класс преобразует входные {@code Entity} в соответственные DTO
 */
public class ResponseDTO {
    
    public UserDTO fromUserEntityToDTO(User user) {
        return new UserDTO(user.getId(), user.getUsername(), user.getEmail());
    }

    public List<UserDTO> fromUserEntityListToDTOList(List<User> users) {
        return users.stream()
            .map(this::fromUserEntityToDTO)
            .toList();
    }

    public TaskListDTO fromTaskListEntityToDTO(TaskList taskList) {
        return new TaskListDTO(taskList.getId(), taskList.getOwner().getId(), taskList.getTitle());
    }

    public List<TaskListDTO> fromTaskListsToDTOList(List<TaskList> taskLists) {
        return taskLists.stream()
            .map(this::fromTaskListEntityToDTO)
            .toList();
    }

    public TaskDTO fromTaskEntityToDTO(Task task) {
        return new TaskDTO(task.getId(), task.getTitle(), task.getDescription(), task.getDue_date(), task.getPriority(), task.getCompleted());
    }

    public List<TaskDTO> fromTaskListToDTOList(List<Task> tasks) {
        return tasks.stream()
            .map(this::fromTaskEntityToDTO)
            .toList();
    }

    public SettingsDTO fromSettingsEntityToDTO(Settings settings) {
        return new SettingsDTO(settings.getDark_mode(), settings.getNotifications_enabled());
    }
}
