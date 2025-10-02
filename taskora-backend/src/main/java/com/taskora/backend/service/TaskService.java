package com.taskora.backend.service;

import java.time.LocalDateTime;
import java.util.List;

import org.springframework.stereotype.Service;

import com.taskora.backend.dto.Priority;
import com.taskora.backend.dto.TaskDTO;
import com.taskora.backend.dto.TaskUpdateRequestDTO;
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
     * @param title создаваемой задачи
     * @return {@link TaskDTO} созданной задачи
     */
    public TaskDTO createTask(TaskList taskList, String title) {
        Task task = new Task();
        task.setTaskList(taskList);
        if (title == null)  task.setTitle("Default task name");
        else task.setTitle(title);
        task.setDescription(null);
        task.setDue_date(null);
        task.setPriority(Priority.DEFAULT);
        task.setCompleted(false);

        repository.save(task);
        ResponseDTO responseDTO = new ResponseDTO();

        return responseDTO.fromTaskEntityToDTO(task);
    }

     // [fix] написать доки и добавить проверки
    public List<TaskDTO> findTasksByTaskListId(Long taskList_id) {
        List<Task> tasks = repository.findByTaskListId(taskList_id);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskListToDTOList(tasks);
    }

    public TaskDTO updateTask(Long task_id, TaskUpdateRequestDTO new_taskDTO) {
        Task old_task = repository.findById(task_id).get();
        old_task.setTitle(new_taskDTO.getTitle());
        old_task.setDescription(new_taskDTO.getDescription());
        old_task.setDue_date(new_taskDTO.getDue_date());
        old_task.setPriority(new_taskDTO.getPriority());
        old_task.setCompleted(new_taskDTO.getCompleted());
        old_task.setUpdated_at(LocalDateTime.now());

        repository.save(old_task);

        ResponseDTO responseDTO = new ResponseDTO();
        return responseDTO.fromTaskEntityToDTO(old_task);
    }

     // [fix] написать доки и добавить проверки
    public void deleteTaskById(Long id) {
        repository.deleteById(id);
    }
}
