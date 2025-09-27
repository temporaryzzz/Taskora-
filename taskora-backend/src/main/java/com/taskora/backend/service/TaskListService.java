package com.taskora.backend.service;

import java.util.List;

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

    /**
     * Создает список задач с дефолтными значениями
     * 
     * @param user кому принадлежит список
     * @return {@link TaskListDTO} созданного списка
     */
    public TaskListDTO createTaskList(User user) {
        TaskList taskList = new TaskList();
        taskList.setOwner(user);
        taskList.setTitle("Inbox");

        repository.save(taskList);
        ResponseDTO responseDTO = new ResponseDTO();

        return responseDTO.fromTaskListEntityToDTO(taskList);
    }

    // [fix] добавить проверку и документацию
    public TaskList findTaskListById(Long id) {
        return repository.findById(id).get();
    }

    // [fix] добавить проверку и документацию
    public List<TaskListDTO> findAllTaskListsByOwnerId(Long owner_id) {
        List<TaskList> taskLists = repository.findByOwnerId(owner_id);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListsToDTOList(taskLists);
    }

}
