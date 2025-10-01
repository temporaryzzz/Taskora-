import { useContext, useEffect, useRef, useState } from 'react';
import '../../styles.scss';
import type { TaskInfo } from '../../App';
import { TaskInfoContext } from '../../App';

function Task(task: TaskInfo) {
	const stateClasses = {
		defaultClass: 'task-list__task',
		completedClass: 'task-list__task--completed',
		activeClass: 'task-list__task--active',
	};

	const stateColors = {
		highest: '#d52b24',
		high: '#1962e8',
		middle: '#238636',
		default: '#818c99b3',
	};

	const monthState = [
		'янв.',
		'фев.',
		'мар.',
		'апр.',
		'мая',
		'июня',
		'июля',
		'авг.',
		'сен.',
		'окт.',
		'ноя.',
		'дек.',
	];

	const taskManagerContext = useContext(TaskInfoContext);
	const currentTaskInfo = taskManagerContext?.currentTaskInfo;

	const taskRef = useRef<HTMLLIElement>(null);
	const taskCheckbox = useRef<HTMLInputElement>(null);

	const [taskCompletedState, setTaskCompletedState] = useState(task.completed);
	const [dateMessage, setDateMessage] = useState('');

	const InizializatePriority = () => {
		if (taskCheckbox.current) {
			switch (task.priority) {
				case 'HIGHEST':
					taskCheckbox.current.style.borderColor = stateColors.highest;
					break;
				case 'HIGH':
					taskCheckbox.current.style.borderColor = stateColors.high;
					break;
				case 'MIDDLE':
					taskCheckbox.current.style.borderColor = stateColors.middle;
					break;
				case 'DEFAULT':
					taskCheckbox.current.style.borderColor = stateColors.default;
					break;
			}
		}
	};

	const InizializateTask = () => {
		if (task.completed === true) {
			if (taskRef.current) taskRef.current.classList.add(stateClasses.completedClass);

			if (taskCheckbox.current) {
				taskCheckbox.current.checked = true;
			}
		}

		InizializatePriority();
	};

	const setStateTask = () => {
		setTaskCompletedState(!taskCompletedState);

		if (taskCheckbox.current) {
			taskCheckbox.current.checked = !taskCompletedState;

			if (taskRef.current) {
				if (taskCheckbox.current.checked == false) {
					taskRef.current.classList.remove(stateClasses.completedClass);
					document.getElementById('inbox-list')?.appendChild(taskRef.current);
				} else {
					taskRef.current.classList.add(stateClasses.completedClass);
					document.getElementById('completed-list')?.appendChild(taskRef.current);
				}
			}
		}

		taskManagerContext?.changeCurrentTask(
			currentTaskInfo?.title ?? '',
			currentTaskInfo?.description ?? '',
			currentTaskInfo?.due_date ?? '',
			currentTaskInfo?.priority ?? 'DEFAULT',
			!taskCompletedState
		);
	};

	const setActiveClass = () => {
		if (taskRef.current) {
			if (taskManagerContext?.currentTaskInfo?.id == task.id) {
				taskRef.current.classList.add(stateClasses.activeClass);
			} else {
				taskRef.current.classList.remove(stateClasses.activeClass);
			}
		}
	};

	const OnMouseUp = () => {
		taskManagerContext?.setCurrentTask(task.id);
	};

	useEffect(InizializateTask, []);
	useEffect(setActiveClass, [taskManagerContext?.currentTaskInfo]);
	useEffect(() => {
		if (task.due_date == '' || task.due_date == null) {
			setDateMessage('');
		} else {
			console.log(task.due_date);
			const date = new Date(task.due_date).getDate();
			const month = new Date(task.due_date).getMonth();
			let hours = new Date(task.due_date).getHours();
			let minutes = new Date(task.due_date).getMinutes();

			if (minutes != 59) {
				setDateMessage(
					String(date) +
						' ' +
						monthState[month] +
						'  ' +
						String(hours < 10 ? '0' + String(hours) : hours) +
						':' +
						String(minutes < 10 ? '0' + String(minutes) : minutes)
				);
			} else {
				setDateMessage(String(date) + ' ' + monthState[month]);
			}
		}

		InizializatePriority();
	}, [task]);

	return (
		<li
			className="task-list__task"
			ref={taskRef}
			id={`task-${task.id}`}
			onMouseUp={() => OnMouseUp()}>
			<input
				type="checkbox"
				id="completed"
				ref={taskCheckbox}
				onChange={setStateTask}></input>
			<h4 onMouseUp={() => OnMouseUp()} id="task">
				{task.title}
			</h4>
			<div className="task-list__task-date" id="task">
				<p id="task">{dateMessage}</p>
			</div>
		</li>
	);
}

export default Task;
