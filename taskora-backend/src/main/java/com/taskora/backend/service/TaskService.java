package com.taskora.backend.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.taskora.backend.dto.Priority;
import com.taskora.backend.dto.TaskDTO;
import com.taskora.backend.entity.Task;
import com.taskora.backend.entity.TaskList;
import com.taskora.backend.repository.TaskRepository;
import com.taskora.backend.utils.ResponseDTO;

@Service
public class TaskService {
    
    TaskRepository repository;


    public TaskService(TaskRepository repository) {
        this.repository = repository;
    }

    /**
     * Создает задачу в БД с дефолтными значениями
     * 
     * @param taskList которой принадлежит задача
     * @return {@link TaskDTO} созданной задачи
     */
    public TaskDTO createTask(TaskList taskList) {
        Task task = new Task();
        task.setTaskList(taskList);
        task.setTitle("Default task name");
        task.setDescription(null);
        task.setDue_date(null);
        task.setPriority(Priority.MIDDLE);
        task.setCompleted(false);

        repository.save(task);
        ResponseDTO responseDTO = new ResponseDTO();

        return responseDTO.fromTaskEntityToDTO(task);
    }

    public List<TaskDTO> findTasksByTaskListId(Long taskList_id) {
        List<Task> tasks = repository.findByTaskListId(taskList_id);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListToDTOList(tasks);
    }
}
