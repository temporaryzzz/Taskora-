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
        List<Task> tasks = new ArrayList<>();

        tasks = repository.findByTaskListId(id);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListToDTOList(tasks);
    }

    /**
     * Обновляет задачу 
     * 
     * @param id обновляемой задачи
     * @param new_taskDTO - задача с новыми занными
     * @return {@link TaskDTO} обновленной задачи; {@code null}, если задача не найдена
     */
    public TaskDTO updateTask(Long id, TaskUpdateRequestDTO new_taskDTO) {
        Task old_task = repository.findById(id)
            .orElse(null);

        old_task.setTitle(new_taskDTO.getTitle());
        old_task.setDescription(new_taskDTO.getDescription());
        old_task.setDueDate(new_taskDTO.getDue_date());
        old_task.setPriority(new_taskDTO.getPriority());
        old_task.setCompleted(new_taskDTO.getCompleted());
        old_task.setUpdatedAt(LocalDateTime.now());

        repository.save(old_task);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskEntityToDTO(old_task);
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
