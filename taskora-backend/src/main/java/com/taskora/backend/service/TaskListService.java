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
import com.taskora.backend.exception.ForbiddenException;
import com.taskora.backend.exception.NotFoundException;
import com.taskora.backend.repository.TaskListRepository;
import com.taskora.backend.utils.ResponseDTO;

@Service
public class TaskListService {
    
    @Autowired
    private TaskListRepository repository;
    

    /**
     * Создает список задач.
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
     * Находит список задач по {@code id}, и проверяет его принадлежность 
     * пользователю.
     * 
     * @param listId - {@code id} искомого списка задач
     * @param userId - {@code id} пользователя, который запрашивает список
     * @return найденный {@link TaskList}
     * @throws NotFoundException если список не найден
     * @throws ForbiddenException если задача не принадлежит пользователю
     */
    public TaskList findTaskListById(Long listId, Long userId) {
        TaskList list = repository.findById(listId)
            .orElseThrow(() -> new NotFoundException());

        if (!list.getOwner().getId().equals(userId))
            throw new ForbiddenException("Нет доступа к списку");

        return list;
    }

    /**
     * Находит неудаленные списки задач по {@code id} пользователя.
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
     * @param listId - {@code id} изменяемого списка
     * @param newTaskList - {@code DTO} с новыми данными
     * @param userId - {@code id} пользователя, запросившего изменения
     * @return {@link TaskListDTO} обновленной задачи
     */
    public TaskListDTO updateTaskList(Long listId, TaskListUpdateRequest newTaskList, Long userId) {
        TaskList list = findTaskListById(listId, userId);
        
        list.setTitle(newTaskList.getTitle());
        list.setSections(newTaskList.getSections());
        list.setIcon(newTaskList.getIcon());
        list.setColor(newTaskList.getColor());
        list.setViewType(newTaskList.getViewType());

        repository.save(list);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListEntityToDTO(list);
    }

    /**
     * Выполняет мягкое удаление задачи.
     * 
     * @param listId - {@code id} списка задач 
     * @param userId - {@code id} пользователя, запросившего удаление
     */
    public void softDeleteTaskListById(Long listId, Long userId) {
        TaskList taskList = findTaskListById(listId, userId);

        taskList.setDeleted(true);
        taskList.setDeletedAt(Instant.now());
        repository.save(taskList);
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
