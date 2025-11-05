import { useContext, useEffect, useRef, useState } from "react";
import type { List } from "../interfaces";
import { TaskManagerContext } from "../App";


type SideBarButtonProps = { list: List };

function SideBarButton(props: SideBarButtonProps) {
	const taskManagerContext = useContext(TaskManagerContext);
	const activeRef = useRef<HTMLButtonElement>(null);
    const [icon, setIcon] = useState<string>()

    const stateClasses = {
        DEFAULT: "icon--circle-default",
        DEFAULT_RED: "icon--circle-red",
        DEFAULT_BLUE: "icon--circle-blue",
        DEFAULT_VIOLET: "icon--circle-violet",
        DEFAULT_YELLOW: "icon--circle-yellow",
        INBOX: "icon--inbox",
        TODAY: "icon--today",
        ALL: "icon--all",
        COMPLETED: "icon--completed",
        BASKET: "icon--basket",
    }

    if(taskManagerContext == undefined) {
        return
    }

    const InitializationButtonIcon = () => {
        switch (props.list.icon) {
            case 'DEFAULT':
                setIcon(stateClasses.DEFAULT)
                break;
            case 'DEFAULT_RED':
                setIcon(stateClasses.DEFAULT_RED)
                break;
            case 'DEFAULT_BLUE':
                setIcon(stateClasses.DEFAULT_BLUE)
                break;
            case 'DEFAULT_VIOLET':
                setIcon(stateClasses.DEFAULT_VIOLET)
                break;
            case 'DEFAULT_YELLOW':
                setIcon(stateClasses.DEFAULT_YELLOW)
                break;
            case 'INBOX':
                setIcon(stateClasses.INBOX)
                break;
            case 'TODAY':
                setIcon(stateClasses.TODAY)
                break;
            case 'ALL':
                setIcon(stateClasses.ALL)
                break;
            case 'BASKET':
                setIcon(stateClasses.BASKET)
                break;
            case 'COMPLETED':
                setIcon(stateClasses.COMPLETED)
                break;
        }
    }

	const setActiveButton = (active: boolean) => {
		if (active == true) {
			if (activeRef.current) activeRef.current.classList.add('side-bar__button--active');
		} else {
			if (activeRef.current) activeRef.current.classList.remove('side-bar__button--active');
		}
	};

	useEffect(() => {
		if (taskManagerContext.state.currentListId == props.list.id) {
			setActiveButton(true);
		} else {
			setActiveButton(false);
		}
	}, [taskManagerContext.state.currentListId]);

    useEffect(() => {
        InitializationButtonIcon()
    }, [props.list.icon])

	return (
        <li 
            className="side-bar__item" 
            onClick={() => {
                taskManagerContext.actions.switchList(props.list.id)
                setActiveButton(true)
                }}>
    <button className={`side-bar__button button icon ${icon}`} ref={activeRef}>{props.list.title}</button>
        </li>
	);
}

export default SideBarButton;