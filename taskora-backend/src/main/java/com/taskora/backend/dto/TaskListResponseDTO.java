package com.taskora.backend.dto;

import java.util.List;

import io.swagger.v3.oas.annotations.media.Schema;

@Schema(description = "Список списков задач")
public class TaskListResponseDTO {
    
    @Schema(description = "Список списков с задачами")
    List<TaskListDTO> taskLists;


    public TaskListResponseDTO(List<TaskListDTO> taskLists) {
        this.taskLists = taskLists;
    }


    public List<TaskListDTO> getTaskLists() {
        return taskLists;
    }

    public void setTaskLists(List<TaskListDTO> taskLists) {
        this.taskLists = taskLists;
    }
}
