import { useRef, useEffect, useContext } from 'react';
import '../../styles.scss';
import { TaskInfoContext, type List } from '../../App';

type SideBarButton = { list: List };

function SideBarButton(props: SideBarButton) {
	const TaskManagerConext = useContext(TaskInfoContext);
	const activeRef = useRef<HTMLLIElement>(null);

	const setActiveButton = (active: boolean) => {
		if (active == true) {
			if (activeRef.current) activeRef.current.classList.add('side-bar__item--active');
		} else {
			if (activeRef.current) activeRef.current.classList.remove('side-bar__item--active');
		}
	};

	useEffect(() => {
		if (TaskManagerConext?.list_id == props.list.id) {
			setActiveButton(true);
		} else {
			setActiveButton(false);
		}
	}, [TaskManagerConext?.list_id]);

	return (
		<li className="side-bar__item" ref={activeRef}>
			<div className="icon icon--inbox-list"></div>
			<h5>{props.list.title}</h5>
		</li>
	);
}

export default SideBarButton;
