package com.taskora.backend.dto;

import java.util.List;

public class TaskResponseDTO {
    
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
