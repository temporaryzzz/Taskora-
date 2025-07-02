package com.taskora.backend.service;

import com.taskora.backend.model.dto.TaskDto;
import com.taskora.backend.model.entity.Task;
import com.taskora.backend.repository.TaskRepository;
import com.taskora.backend.util.mapper.TaskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class TaskServiceImpl implements TaskService{

    @Autowired
    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    /**
     * Получает список всех задач, найденных в базе данных.
     *
     * @return список {@link TaskDto}; пустой список, если записи не найдены.
     */
    @Override
    public List<TaskDto> getAllTasks() {
        List<Task> taskEntities = taskRepository.findAll();
        List<TaskDto> taskDtos = new ArrayList<>();

        var taskMapper = new TaskMapper();
        for (Task task : taskEntities) {
            var dto = taskMapper.toDto(task);
            taskDtos.add(dto);
        }

        return taskDtos;
    }

    /**
     * Возвращает {@link TaskDto} задачи по id.
     *
     * @param id id задачи в базе данных.
     * @return {@link TaskDto} задачи; {@code null}, если задача не найдена.
     */
    @Override
    public TaskDto getTaskById(Long id) {
        Task task = taskRepository.findById(id).get(); // to_change: добавить проверку, если task не найдена
        var taskMapper = new TaskMapper();

        return taskMapper.toDto(task);
    }

    @Override
    public TaskDto createTask(TaskDto taskDto) {
        var taskMapper = new TaskMapper();

        var newTask = taskMapper.toEntity(taskDto);
        taskRepository.save(newTask);

        return taskDto;
    }

    @Override
    public TaskDto updateTask(Long id, TaskDto taskDto) {
        Task task = taskRepository.findById(id).get(); // to_change: также добавить проверку isPresent()
        task.setTitle(taskDto.getTitle());
        task.setDescription(taskDto.getDescription());

        taskRepository.save(task);

        return taskDto;
    }

    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
