import { useEffect, useState, useContext } from 'react';
import '../../styles.scss';
import { TaskInfoContext } from '../../App';
import Calendar from '../calendar/calendar';

function TaskInfoWindow() {
  const taskManagerContext = useContext(TaskInfoContext);

  if (!taskManagerContext) {
    return null;
  }

  const { currentTaskInfo, changeCurrentTask } = taskManagerContext;
  const [taskTitle, setTaskTitle] = useState<string | undefined>(
    currentTaskInfo?.title
  );
  const [taskDescription, setTaskDescription] = useState<string | undefined>(
    currentTaskInfo?.description
  );

  //⁡⁣⁣⁢Прописываем отдельно, а не через changeCurrentTask чтобы можно было динамически отображать изменения в компоненте task⁡
  const changeTitle = (title: string) => {
    const currentTaskIndex = taskManagerContext?.tasks?.findIndex(
      task => task.id === currentTaskInfo?.id
    );

    if (
      currentTaskIndex != undefined &&
      taskManagerContext.tasks != undefined &&
      currentTaskInfo?.id != undefined
    ) {
      console.log('change');
      taskManagerContext.tasks[currentTaskIndex].title = title;
      taskManagerContext.updateList();
      console.log(taskManagerContext.tasks[currentTaskIndex]);
      console.log(taskManagerContext.tasks);
    }
  };

  //Обновление данных
  useEffect(() => {
    setTaskTitle(currentTaskInfo?.title);
    setTaskDescription(currentTaskInfo?.description);
  }, [currentTaskInfo]);

  return (
    <div
      className="task-info-window"
      style={{
        visibility: `${currentTaskInfo == undefined ? 'hidden' : 'visible'}`,
      }}
    >
      <textarea
        className="task-info-window__title"
        value={taskTitle}
        onBlur={e => {
          changeCurrentTask(
            e.target.value,
            taskDescription ?? '',
            currentTaskInfo?.due_date ?? '',
            currentTaskInfo?.priority ?? 'DEFAULT',
            currentTaskInfo?.completed ?? false
          );
        }}
        onChange={e => {
          setTaskTitle(e.target.value);
          changeTitle(e.target.value);
        }}
      ></textarea>

      <textarea
        className="task-info-window__description"
        value={taskDescription}
        placeholder="Добавьте описание..."
        onBlur={e => {
          changeCurrentTask(
            taskTitle ?? '',
            e.target.value,
            currentTaskInfo?.due_date ?? '',
            currentTaskInfo?.priority ?? 'DEFAULT',
            currentTaskInfo?.completed ?? false
          );
        }}
        onChange={e => {
          setTaskDescription(e.target.value);
        }}
      ></textarea>

      <Calendar />
    </div>
  );
}

export default TaskInfoWindow;
