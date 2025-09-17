package com.taskora.backend.dto;

import java.util.List;


public class TaskListResponseDTO {
    
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
