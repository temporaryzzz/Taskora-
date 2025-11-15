package com.taskora.backend.service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

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
     * @param title создаваемой задачи
     * @return {@link TaskDTO} созданной задачи
     */
    public TaskDTO createTask(TaskList taskList, String title) {
        Task task = new Task();
        task.setTaskList(taskList);
        if (title == null)  task.setTitle("Default task name");
        else task.setTitle(title);
        task.setDescription(null);
        task.setDueDate(null);
        task.setPriority("DEFAULT");
        task.setCompleted(false);

        repository.save(task);
        ResponseDTO responseDTO = new ResponseDTO();

        return responseDTO.fromTaskEntityToDTO(task);
    }

    /**
     * Находит задачи по {@code id} списка задач
     * 
     * @param id списка задач
     * @return список найденных задач; пустой список, если задачи не найдены
     */
    public List<TaskDTO> findTasksByTaskListId(Long id) {
        List<Task> tasks = repository.findByTaskListId(id);

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
    public List<TaskDTO> findCompletedTasksByOwnerId(Long id) {
        List<Task> tasks = new ArrayList<>();

        tasks = repository.findByOwnerIdAndCompletedTrue(id);
        ResponseDTO responseDTO = new ResponseDTO();

        return responseDTO.fromTaskListToDTOList(tasks);
    }

    /**
     * Обновляет задачу 
     * 
     * @param id обновляемой задачи
     * @param newTaskDTO - задача с новыми занными
     * @return {@link TaskDTO} обновленной задачи; {@code null}, если задача не найдена
     */
    public TaskDTO updateTask(Long id, TaskUpdateRequestDTO newTaskDTO) {
        Task oldTask = repository.findById(id)
            .orElse(null);

        if (oldTask == null) return null;

        oldTask.setTitle(newTaskDTO.getTitle());
        oldTask.setDescription(newTaskDTO.getDescription());
        oldTask.setDueDate(newTaskDTO.getDue_date());
        oldTask.setPriority(newTaskDTO.getPriority());
        oldTask.setCompleted(newTaskDTO.getCompleted());
        oldTask.setUpdatedAt(LocalDateTime.now());

        repository.save(oldTask);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskEntityToDTO(oldTask);
    }

    /**
     * 
     * @param id
     */
    public boolean softDeleteTaskById(Long id) {
        Task task = repository.findById(id)
            .orElse(null);
        
        if (task == null) return false;

        task.setDeleted(true);
        repository.save(task);

        return true;
    }

    /**
     * 
     * @param id
     */
    public void softDeleteTasksByTaskListId(Long id) {
        List<Task> tasks = repository.findByTaskListIdAndDeletedFalse(id);

        if (tasks.isEmpty()) return;

        tasks.forEach(task -> {
            task.setDeleted(true);
            task.setDeletedAt(LocalDateTime.now());
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
