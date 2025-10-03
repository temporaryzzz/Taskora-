import '../../styles.scss';
import { useContext, useRef, useState, type FormEvent } from 'react';
import { TaskInfoContext } from '../../App';
import type { TaskInfo } from '../../App';
import { AddTask } from '../../scripts/dataTaskManager';

function CreateTaskForm() {
	const taskManagerContext = useContext(TaskInfoContext);
	const inputTitleTaskRef = useRef<HTMLInputElement>(null);
	const [taskTitle, setTaskTitile] = useState<string>();

	const createTask = (event: FormEvent) => {
		event.preventDefault();

		// /\S/ - любой символ кроме пробела
		if (/\S/.test(taskTitle ?? '')) {
			if (
				taskManagerContext &&
				taskManagerContext.tasks &&
				taskManagerContext.currentList_id
			) {
				let task_id;

				AddTask(taskManagerContext.currentList_id, taskTitle ?? '').then((taskData) => {
					task_id = Number(taskData.id);
					if (taskManagerContext.tasks) {
						const updatedTasks: Array<TaskInfo> = taskManagerContext.tasks;

						updatedTasks.push({
							id: Number(task_id),
							taskList_id: Number(taskManagerContext.currentTaskInfo?.taskList_id),
							title: taskTitle ?? '',
							description: '',
							due_date: '',
							completed: false,
							priority: 'DEFAULT',
						});
						taskManagerContext?.updateTasks(updatedTasks);
					}
				});

				if (inputTitleTaskRef.current) inputTitleTaskRef.current.value = '';
			}
		}
	};

	return (
		<form className="create-task-form" onSubmit={(event) => createTask(event)}>
			<input
				className="create-task-form__title-input"
				placeholder="Добавить задачу..."
				ref={inputTitleTaskRef}
				onChange={(e) => {
					setTaskTitile(e.target.value);
				}}></input>
		</form>
	);
}

export default CreateTaskForm;
