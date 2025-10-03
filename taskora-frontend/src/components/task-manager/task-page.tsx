import { useState, useEffect } from 'react';
import '../../styles.scss';
import SideBar from './side-bar';
import TaskInfoWindow from './task-info-window';
import TaskList from './task-list';
import ContextMenu from '../contextMenu';

function TaskPage() {
	const [contextMenuActive, setContextMenuActive] = useState(false);
	const [mouseX, setMouseX] = useState<number>(0);
	const [mouseY, setMouseY] = useState<number>(0);

	const OnContextMenu = (event: React.MouseEvent) => {
		if (
			(event.target as Element).classList.contains('task-list__task') ||
			(event.target as Element).id == 'task'
		) {
			event.preventDefault();
			const taskListElement = document.querySelector('.task-list');

			if (taskListElement) {
				const { top } = taskListElement.getBoundingClientRect();
				setMouseX(event.clientX);
				if (window.innerHeight - event.clientY > 370) {
					setMouseY(event.clientY - (top - taskListElement.clientTop)); //Считаем от начала taskListElement(потому что task-page не включает в себя шапку)
				} else {
					setMouseY(event.clientY - (top - taskListElement.clientTop) - 370);
				}
				setContextMenuActive(!contextMenuActive);
			}
		} else {
			return;
		}
	};

	//С пустым массивом зависимостей выполнится только при монтировании
	useEffect(() => {
		document.addEventListener('mouseup', () => {
			setContextMenuActive(false);
		});
		return () =>
			document.removeEventListener('mouseup', () => {
				setContextMenuActive(false);
			});
	}, []);

	return (
		<div
			className="task-page"
			id="task-page"
			onContextMenu={(event) => OnContextMenu(event)}>
			<ContextMenu active={contextMenuActive} x={mouseX} y={mouseY} />
			<SideBar />
			<TaskList />
			<TaskInfoWindow />
		</div>
	);
}

export default TaskPage;
