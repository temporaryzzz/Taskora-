package com.taskora.backend.service;

import com.taskora.backend.model.dto.TaskDto;
import com.taskora.backend.model.entity.Task;
import com.taskora.backend.repository.TaskRepository;
import com.taskora.backend.util.mapper.TaskMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.util.Streamable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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
        Iterable<Task> taskIterable = taskRepository.findAll();
        var taskMapper = new TaskMapper();

        return Streamable.of(taskIterable) // Магия, превращающая Iterable в Stream
                .map(taskMapper::toDto)
                .toList();
    }

    /**
     * Возвращает {@link TaskDto} задачи по id.
     *
     * @param id id задачи в базе данных.
     * @return {@link TaskDto} задачи; {@code null}, если задача не найдена.
     */
    @Override
    public TaskDto getTaskById(Long id) {
        Optional<Task> taskOptional = taskRepository.findById(id);

        if (taskOptional.isEmpty())
            return null;

        var taskMapper = new TaskMapper();

        return taskMapper.toDto(taskOptional.get());
    }

    /**
     * Создает {@link Task} в базе данных.
     *
     * @param taskDto DTO с данными для создания задачи.
     * @return {@link TaskDto} созданной задачи.
     */
    // to_change: добавить обработчик ошибки создания
    @Override
    public TaskDto createTask(TaskDto taskDto) {
        var taskMapper = new TaskMapper();
        taskRepository.save(taskMapper.toEntity(taskDto));

        return taskDto;
    }

    /**
     * Обновляет задачу в базе данных.
     *
     * @param id id задачи, которую нужно обновить.
     * @param taskDto - DTO с новыми данными задачи.
     * @return {@link TaskDto} обновленной задачи; {@code null}, если задача с таким {@code id} не найдена.
     */
    // to_change: добавить обработчик ошибки обновления
    @Override
    public TaskDto updateTask(Long id, TaskDto taskDto) {
        Optional<Task> taskOptional = taskRepository.findById(id);

        if (taskOptional.isEmpty())
            return null;

        Task taskToUpdate = taskOptional.get();
        taskToUpdate.setTitle(taskDto.getTitle());
        taskToUpdate.setDescription(taskDto.getDescription());

        taskRepository.save(taskToUpdate);

        return taskDto;
    }

    /**
     * Удаляет запись {@link Task} из базы данных.
     *
     * @param id id задачи, которую нужно удалить.
     */
    // to_change: добавить обработчик ошибки удаления
    @Override
    public void deleteTask(Long id) {
        taskRepository.deleteById(id);
    }
}
