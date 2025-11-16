package com.taskora.backend.service;

import java.time.Instant;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.taskora.backend.dto.TaskCreateRequestDTO;
// import com.taskora.backend.dto.Priority;
import com.taskora.backend.dto.TaskDTO;
import com.taskora.backend.dto.TaskUpdateRequestDTO;
import com.taskora.backend.entity.Task;
import com.taskora.backend.entity.TaskList;
import com.taskora.backend.repository.TaskRepository;
import com.taskora.backend.utils.ResponseDTO;

@Service
public class TaskService {
    
    @Autowired
    private TaskRepository repository;


    /**
     * Создает задачу с дефолтными значениями
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
    public List<TaskDTO> findTasksByOwnerId(Long id) {
        List<Task> tasks = repository.findByOwnerId(id);
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
        List<Task> tasks = new ArrayList<>();

        tasks = repository.findByOwnerIdAndCompletedTrueAndDeletedFalse(id);
        ResponseDTO responseDTO = new ResponseDTO();

        return responseDTO.fromTaskListToDTOList(tasks);
    }

    /**
     * Обновляет задачу 
     * 
     * @param id обновляемой задачи
     * @param taskList [fix]
     * @param newTaskDTO - задача с новыми занными
     * @return {@link TaskDTO} обновленной задачи; {@code null}, если задача не найдена
     */
    public TaskDTO updateTask(Long id, TaskList taskList, TaskUpdateRequestDTO newTaskDTO) {
        Task task = repository.findById(id)
            .orElse(null);
        if (task == null) return null;

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
     * @param id
     */
    public boolean softDeleteTaskById(Long id) {
        Task task = repository.findById(id)
            .orElse(null);
        
        if (task == null) return false;

        task.setDeleted(true);
        task.setDeletedAt(Instant.now());
        repository.save(task);

        return true;
    }

    /**
     * [fix]
     * 
     * @param id
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
}
