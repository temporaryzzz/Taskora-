import '../styles.scss';
import { useContext, useEffect, useRef } from 'react';
import { TaskInfoContext } from '../App';
import { DeleteTask } from '../scripts/dataTaskManager';

function ContextMenu({ active, x, y }: { active: boolean; x: number; y: number }) {
	const stateClasses = { hiddenMenu: 'context-menu', activeMenu: 'context-menu--active' };

	const taskManagerContext = useContext(TaskInfoContext);
	const currentTask = taskManagerContext?.currentTaskInfo;

	const contextMenuRef = useRef<HTMLUListElement>(null);

	const setPriority = (priority: 'HIGHEST' | 'HIGH' | 'MIDDLE' | 'DEFAULT') => {
		if (taskManagerContext?.currentTaskInfo) {
			taskManagerContext.changeCurrentTask(
				taskManagerContext.currentTaskInfo.title,
				taskManagerContext.currentTaskInfo.description,
				taskManagerContext.currentTaskInfo.due_date,
				priority,
				taskManagerContext.currentTaskInfo.completed
			);
		}
	};

	const changeVisibleMenu = (active: boolean) => {
		if (contextMenuRef.current) {
			if (active == true) {
				contextMenuRef.current.classList.add(stateClasses.activeMenu);
				contextMenuRef.current.style.left = `${x}px`;
				contextMenuRef.current.style.top = `${y}px`;
			} else {
				contextMenuRef.current.classList.remove(stateClasses.activeMenu);
			}
		}
	};

	const deleteTask = () => {
		if (currentTask && taskManagerContext.tasks) {
			DeleteTask(currentTask.id);
			const currentTaskIndex = taskManagerContext.tasks.findIndex(
				(task) => task.id === currentTask.id
			);
			taskManagerContext.tasks.splice(currentTaskIndex, 1);
		}
	};

	const PostponeUntilTomorrow = () => {
		if (taskManagerContext && currentTask) {
			const now = new Date();
			const tomorrow = new Date(
				now.getFullYear(),
				now.getMonth(),
				now.getDate() + 1,
				23,
				59
			);
			if (currentTask.due_date != '') {
				tomorrow.setHours(new Date(currentTask.due_date).getHours());
				tomorrow.setMinutes(new Date(currentTask.due_date).getMinutes());
			}
			taskManagerContext.changeCurrentTask(
				currentTask.title,
				currentTask.description,
				String(tomorrow),
				currentTask.priority,
				currentTask.completed
			);
		}
	};

	useEffect(() => changeVisibleMenu(active), [active]);

	return (
		<ul className="context-menu" ref={contextMenuRef} id="context-menu">
			<span className="context-menu__title">
				<p>Приоритет</p>
			</span>
			<ul className="context-menu__container">
				<li
					className="context-menu__item context-menu__item--priority"
					onMouseDown={() => setPriority('HIGHEST')}>
					<img
						src="/red-priority-icon.svg"
						width={'23px'}
						height={'23px'}
						style={{ margin: '0 auto' }}></img>
				</li>

				<li
					className="context-menu__item context-menu__item--priority"
					onMouseDown={() => setPriority('HIGH')}>
					<img
						src="/blue-priority-icon.svg"
						width={'23px'}
						height={'23px'}
						style={{ margin: '0 auto' }}></img>
				</li>

				<li
					className="context-menu__item context-menu__item--priority"
					onMouseDown={() => setPriority('MIDDLE')}>
					<img
						src="/green-priority-icon.svg"
						width={'23px'}
						height={'23px'}
						style={{ margin: '0 auto' }}></img>
				</li>

				<li
					className="context-menu__item context-menu__item--priority"
					onMouseDown={() => setPriority('DEFAULT')}>
					<img
						src="/gray-priority-icon.svg"
						width={'23px'}
						height={'23px'}
						style={{ margin: '0 auto' }}></img>
				</li>
			</ul>

			<li className="context-menu__item" onMouseDown={PostponeUntilTomorrow}>
				Перенести на завтра
			</li>
			<li className="context-menu__item">Добавить подзадачу</li>
			<li className="context-menu__item">Прикрепить файл</li>
			<li
				className="context-menu__item context-menu__item--delete"
				onMouseDown={() => deleteTask()}>
				Удалить
			</li>
		</ul>
	);
}

export default ContextMenu;
