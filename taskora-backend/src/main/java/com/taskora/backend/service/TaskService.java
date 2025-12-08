package com.taskora.backend.service;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskora.backend.dto.TaskCreateRequestDTO;
import com.taskora.backend.dto.TaskDTO;
import com.taskora.backend.dto.TaskUpdateRequestDTO;
import com.taskora.backend.entity.Task;
import com.taskora.backend.entity.TaskList;
import com.taskora.backend.exception.ForbiddenException;
import com.taskora.backend.exception.NotFoundException;
import com.taskora.backend.repository.TaskRepository;
import com.taskora.backend.utils.ResponseDTO;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository repository;


    /**
     * Создает задачу.
     * 
     * @param taskList которой принадлежит задача
     * @param data - информация о создаваемой задачи
     * @return {@link TaskDTO} созданной задачи
     */
    public TaskDTO createTask(TaskList taskList, TaskCreateRequestDTO data) {
        Task task = new Task();
        
        task.setOwner(taskList.getOwner());
        task.setTaskList(taskList);
        task.setSection(data.getSection());
        task.setTitle(data.getTitle());
        task.setDescription(data.getDescription());
        task.setDueDate(data.getDueDate());
        task.setPriority(data.getPriority());

        repository.save(task);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskEntityToDTO(task);
    }

    /**
     * Находит неудаленные задачи по {@code id} списка задач
     * 
     * @param id списка задач
     * @return список найденных задач; пустой список, если задачи не найдены
     */
    public List<TaskDTO> findNotDeletedTasksByTaskListId(Long id) {
        List<Task> tasks = repository.findByTaskListIdAndDeletedFalse(id);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListToDTOList(tasks);
    }

    /**[fix]
     * 
     * @param id
     * @return
     */
    public List<TaskDTO> findNonDeletedTasksByOwnerId(Long id) {
        List<Task> tasks = repository.findByOwnerIdAndDeletedFalse(id);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListToDTOList(tasks);
    }

    /**
     * [fix]
     * 
     * @param id
     * @param tz
     * @return
     */
    public List<TaskDTO> findTodayTasksByOwnerId(Long id, String tz) {
        ZoneId zone = ZoneId.of(tz);
        LocalDate today = LocalDate.now(zone);
        Instant start = today.atStartOfDay(zone).toInstant();
        Instant end = today.plusDays(1).atStartOfDay(zone).toInstant();
        
        List<Task> tasks = repository.findByOwnerIdAndDeletedFalseAndDueDateBetween(id, start, end);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListToDTOList(tasks);
    }

    /**[fix]
     * 
     * @param id
     * @return
     */
    public List<TaskDTO> findDeletedTasksByOwnerId(Long id) {
        List<Task> tasks = repository.findByOwnerIdAndDeletedTrue(id);
        ResponseDTO responseDTO = new ResponseDTO();

        return responseDTO.fromTaskListToDTOList(tasks);
    }

    /**[fix]
     * 
     * @param id
     * @return
     */
    public List<TaskDTO> findCompletedAndNotDeletedTasksByOwnerId(Long id) {
        List<Task> tasks = repository.findByOwnerIdAndCompletedTrueAndDeletedFalse(id);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListToDTOList(tasks);
    }

    /**
     * [fix]
     * 
     * @param taskId
     * @param userId
     * @return
     * @throws NotFoundException
     * @throws ForbiddenException
     */
    public Task findTaskById(Long taskId, Long userId) {
        Task task = repository.findById(taskId)
            .orElseThrow(() -> new NotFoundException());

        if (!task.getOwner().getId().equals(userId))
            throw new ForbiddenException("Нет доступа к задаче");

        return task;
    };

    /**
     * Обновляет задачу, изменяя все поля задачи из БД на новые.
     * 
     * @param id обновляемой задачи
     * @param taskList [fix]
     * @param newTaskDTO - задача с новыми занными
     * @return {@link TaskDTO} обновленной задачи; {@code null}, если задача не найдена
     * @throws NotFoundException если изменяемая задача не найдена
     */
    public TaskDTO updateTask(Long id, TaskList taskList, TaskUpdateRequestDTO newTaskDTO) {
        Task task = repository.findById(id)
            .orElseThrow(() -> new NotFoundException());
        
        task.setTaskList(taskList);
        task.setSection(newTaskDTO.getSection());
        task.setTitle(newTaskDTO.getTitle());
        task.setDescription(newTaskDTO.getDescription());
        task.setDueDate(newTaskDTO.getDueDate());
        task.setPriority(newTaskDTO.getPriority());
        task.setCompleted(newTaskDTO.isCompleted());

        repository.save(task);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskEntityToDTO(task);
    }

    /**
     * [fix]
     * 
     * @param taskId
     * @param userId
     */
    public void softDeleteTaskById(Long taskId, Long userId) {
        Task task = findTaskById(taskId, userId);
        
        task.setDeleted(true);
        task.setDeletedAt(Instant.now());
        repository.save(task);
    }

    /**
     * Выполняет мягкое удаление всех задач привязанных к {@link TaskList}.
     * 
     * @param id списка задач
     */
    public void softDeleteTasksByTaskListId(Long id) {
        List<Task> tasks = repository.findByTaskListIdAndDeletedFalse(id);

        if (tasks.isEmpty()) return;

        tasks.forEach(task -> {
            task.setDeleted(true);
            task.setDeletedAt(Instant.now());
        });
        
        repository.saveAll(tasks);
    }

    /**
     * Удаляет задачу
     * 
     * @param id удаляемой задачи
     */
    public void deleteTaskById(Long id) {
        repository.deleteById(id);
    }

    /**
     * [fix]
     * 
     * @param id
     * @param userId
     */
    public void restoreTaskById(Long id, Long userId) {
        Task task = findTaskById(id, userId);

        task.setDeleted(false);
        task.setDeletedAt(null);
        repository.save(task);
    }
}
