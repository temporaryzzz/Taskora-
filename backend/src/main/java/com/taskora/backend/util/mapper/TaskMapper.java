package com.taskora.backend.util.mapper;

import com.taskora.backend.model.dto.TaskDto;
import com.taskora.backend.model.entity.Task;

public class TaskMapper {

    public TaskDto toDto(Task task) {
        return new TaskDto(
                task.getTitle(),
                task.getDescription()
        );
    }

    public Task toEntity(TaskDto taskDto) {
        return new Task(
                taskDto.getTitle(),
                taskDto.getDescription()
        );
    }
}
