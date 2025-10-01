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
    public TaskListDTO createDefaultTaskList(User user) {
        TaskList taskList = new TaskList();
        taskList.setOwner(user);
        taskList.setTitle("Default list name");

        repository.save(taskList);
        ResponseDTO responseDTO = new ResponseDTO();

        return responseDTO.fromTaskListEntityToDTO(taskList);
    }

    // [fix] добавить проверку и документацию
    public TaskListDTO createTaskList(User owner, String title) {
        TaskList taskList = new TaskList();
        taskList.setOwner(owner);
        taskList.setTitle(title);

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

    // [fix] добавить проверку и документацию
    public TaskListDTO updateTaskList(TaskListDTO new_taskList) {
        TaskList old_taskList = repository.findById(new_taskList.getId()).get();
        old_taskList.setTitle(new_taskList.getTitle());

        repository.save(old_taskList);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListEntityToDTO(old_taskList);
    }

    // [fix] добавить проверку и документацию
    public void deleteTaskListById(Long id) {
        repository.deleteById(id);
    }
}
