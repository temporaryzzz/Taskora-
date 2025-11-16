package com.taskora.backend.service;

import java.time.Instant;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskora.backend.dto.TaskListCreateRequestDTO;
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
     * Создает список задач
     * 
     * @param owner кому принадлежит список
     * @param data - информация о создаваемом списке задач
     * @return {@link TaskListDTO} созданного списка
     */
    public TaskListDTO createTaskList(User owner, TaskListCreateRequestDTO data) {
        TaskList taskList = new TaskList();

        taskList.setOwner(owner);
        taskList.setTitle(data.getTitle());
        taskList.setIcon(data.getIcon());
        taskList.setColor(data.getColor());
        taskList.setViewType(data.getViewType());

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
        if (id == null) return null;

        return repository.findById(id).orElse(null);
    }

    /**
     * Находит неудаленные списки задач по {@code id} пользователя
     * 
     * @param userId - {@code id} пользователя
     * @return найденные списки задач; пустой список, если списки не найдены
     */
    public List<TaskListDTO> findTaskListsByOwnerId(Long userId) {        
        List<TaskList> taskLists = repository.findByOwnerIdAndDeletedFalse(userId);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListsToDTOList(taskLists);
    }

    /**
     * Обновляет список задач
     * 
     * @param id изменяемого списка
     * @param newTaskList - {@code DTO} с новыми данными
     * @return {@link TaskListDTO} обновленной задачи; {@code null}, если список не найден
     */
    public TaskListDTO updateTaskList(Long id, TaskListUpdateRequest newTaskList) {
        TaskList taskList = repository.findById(id)
            .orElse(null);
        if (taskList == null) return null;
        
        taskList.setTitle(newTaskList.getTitle());
        taskList.setSections(newTaskList.getSections());
        taskList.setIcon(newTaskList.getIcon());
        taskList.setColor(newTaskList.getColor());
        taskList.setViewType(newTaskList.getViewType());

        repository.save(taskList);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListEntityToDTO(taskList);
    }

    public TaskListDTO softDeleteTaskListById(Long id) {
        TaskList taskList = repository.findById(id)
            .orElse(null);

        if (taskList == null) return null;

        taskList.setDeleted(true);
        taskList.setDeletedAt(Instant.now());
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
