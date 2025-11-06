import { useContext, useEffect, useRef, useState } from "react";
import type { List } from "../interfaces";
import { TaskManagerContext } from "../App";


type SideBarButtonProps = { list: List };

function SideBarButton(props: SideBarButtonProps) {
	const taskManagerContext = useContext(TaskManagerContext);
	const activeRef = useRef<HTMLButtonElement>(null);
    const [icon, setIcon] = useState<string>()
    const [color, setColor] = useState<string>()

    const stateClassesIcon = {
        DEFAULT: "icon--circle-default",
        LINES: "icon--lines",
        SHEET: "icon--sheet",
        INBOX: "icon--inbox",
        TODAY: "icon--today",
        ALL: "icon--all",
        COMPLETED: "icon--completed",
        BASKET: "icon--basket",
    }

    const stateClassesColor = {
        LIGHT: "color-indicator--light",
        RED: "color-indicator--red",
        VIOLET: "color-indicator--violet",
        GREEN: "color-indicator--green",
        BLUE: "color-indicator--blue",
        YELLOW: "color-indicator--yellow",
        NONE: "",
    }

    if(taskManagerContext == undefined) {
        return
    }

    const InitializationButtonIcon = () => {
        switch (props.list.icon) {
            case 'DEFAULT':
                setIcon(stateClassesIcon.DEFAULT)
                break;
            case 'LINES':
                setIcon(stateClassesIcon.LINES)
                break;
            case 'SHEET':
                setIcon(stateClassesIcon.SHEET)
                break;
            case 'INBOX':
                setIcon(stateClassesIcon.INBOX)
                break;
            case 'TODAY':
                setIcon(stateClassesIcon.TODAY)
                break;
            case 'ALL':
                setIcon(stateClassesIcon.ALL)
                break;
            case 'BASKET':
                setIcon(stateClassesIcon.BASKET)
                break;
            case 'COMPLETED':
                setIcon(stateClassesIcon.COMPLETED)
                break;
        }
    }

    const InitializationColorIndicator = () => {
        switch (props.list.color) {
            case 'LIGHT':
                setColor(stateClassesColor.LIGHT)
                break;
            case 'RED':
                setColor(stateClassesColor.RED)
                break;
            case 'VIOLET':
                setColor(stateClassesColor.VIOLET)
                break;
            case 'GREEN':
                setColor(stateClassesColor.GREEN)
                break;
            case 'BLUE':
                setColor(stateClassesColor.BLUE)
                break;
            case 'YELLOW':
                setColor(stateClassesColor.YELLOW)
                break;
            case 'NONE':
                setColor(stateClassesColor.NONE)
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

    useEffect(() => {
        InitializationColorIndicator()
    }, [props.list.color])

    if(props.list.title == 'Basket' || props.list.title == 'Completed') {
        return (
            <li 
                className="side-bar__item" 
                onClick={() => {
                    taskManagerContext.actions.switchList(props.list.id)
                    setActiveButton(true)
                    }}>
                <button className={`side-bar__button button icon ${icon}`} ref={activeRef}>
                    {props.list.title}
                </button>
            </li>
        );
    }
    else {
        return (
            <li 
                className="side-bar__item" 
                onClick={() => {
                    taskManagerContext.actions.switchList(props.list.id)
                    setActiveButton(true)
                    }}>
                <button className={`side-bar__button button icon ${icon}`} ref={activeRef}>
                    <p className="side-bar__button-title">{props.list.title}</p>
                    <span className={`color-indicator ${color}`}></span>
                </button>
            </li>
        );
    }
}

export default SideBarButton;