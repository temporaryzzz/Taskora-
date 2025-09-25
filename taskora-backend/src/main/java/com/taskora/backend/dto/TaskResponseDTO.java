package com.taskora.backend.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Список с задачами")
public class TaskResponseDTO {
    
    @Schema(description = "Список с задачами")
    List<TaskDTO> taskDTOs;


    public TaskResponseDTO(List<TaskDTO> taskDTOs) {
        this.taskDTOs = taskDTOs;
    }

    
    public List<TaskDTO> getTaskDTOs() {
        return taskDTOs;
    }

    public void setTaskDTOs(List<TaskDTO> taskDTOs) {
        this.taskDTOs = taskDTOs;
    }
}
