package com.taskora.backend.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskora.backend.dto.TaskListDTO;
import com.taskora.backend.dto.TaskListUpdateRequest;
import com.taskora.backend.entity.TaskList;
import com.taskora.backend.entity.User;
import com.taskora.backend.repository.TaskListRepository;
import com.taskora.backend.utils.ResponseDTO;

@Service
public class TaskListService {
    
    @Autowired
    private TaskListRepository repository;
    

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

    /**
     * Создает список задач
     * 
     * @param user кому принадлежит список
     * @param title - название создаваемого списка задач
     * @return {@link TaskListDTO} созданного списка
     */
    public TaskListDTO createTaskList(User user, String title) {
        TaskList taskList = new TaskList();
        taskList.setOwner(user);
        taskList.setTitle(title);

        repository.save(taskList);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListEntityToDTO(taskList);
    }

    /**
     * Находит список задач по {@code id}
     * 
     * @param id списка задач
     * @return найденный {@link TaskList}; {@code null}, если список не найден
     */
    public TaskList findTaskListById(Long id) {
        return repository.findById(id).orElse(null);
    }

    /**
     * Находит все списки задач по {@code id} пользователя
     * 
     * @param user_id - {@code id} пользователя
     * @return найденные списки задач; пустой список, если списки не найдены
     */
    public List<TaskListDTO> findAllTaskListsByOwnerId(Long user_id) {
        List<TaskList> taskLists = new ArrayList<>();
        
        taskLists = repository.findByOwnerId(user_id);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListsToDTOList(taskLists);
    }

    /**
     * Обновляет список задач
     * 
     * @param id изменяемого списка
     * @param new_taskList - {@code DTO} с новыми данными
     * @return {@link TaskListDTO} обновленной задачи; {@code null}, если список не найден
     */
    public TaskListDTO updateTaskList(Long id, TaskListUpdateRequest new_taskList) {
        TaskList taskList = repository.findById(id)
            .orElse(null);
        
        taskList.setTitle(new_taskList.getTitle());

        repository.save(taskList);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListEntityToDTO(taskList);
    }

    /**
     * Удаляет список задач
     * 
     * @param id удаляемого списка
     */
    public void deleteTaskListById(Long id) {
        repository.deleteById(id);
    }
}
