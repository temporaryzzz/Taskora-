package com.taskora.backend.service;

import org.springframework.stereotype.Service;

import com.taskora.backend.dto.TaskListDTO;
import com.taskora.backend.entity.TaskList;
import com.taskora.backend.entity.User;
import com.taskora.backend.repository.TaskListRepository;
import com.taskora.backend.utils.ResponseDTO;

@Service
public class TaskListService {
    private final TaskListRepository repository;

    public TaskListService(TaskListRepository repository) {
        this.repository = repository;
    }

    public TaskListDTO createTaskList(User user) {
        TaskList taskList = new TaskList();
        taskList.setOwner(user);
        taskList.setTitle("Default");

        repository.save(taskList);

        ResponseDTO responseDTO = new ResponseDTO();

        return responseDTO.fromTaskListEntityToDTO(taskList);
    }
}
