import { useContext, useEffect, useRef, useState } from "react";
import type { List } from "../interfaces";
import { TaskManagerContext } from "../App";
import { EditListForm } from "./edit-list-form";


type SideBarButtonProps = { list: List };

function SideBarButton(props: SideBarButtonProps) {
	const taskManagerContext = useContext(TaskManagerContext);
	const activeRef = useRef<HTMLButtonElement>(null);
    const [icon, setIcon] = useState<string>()
    const [color, setColor] = useState<string>()
    const [activeEditForm, setActiveEditForm] = useState<boolean>(false)

    const stateClassesIcon = {
        DEFAULT: "icon--circle-default",
        LINES: "icon--lines",
        SHEET: "icon--sheet",
        FOLDER: "icon--folder",
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
            case 'FOLDER':
                setIcon(stateClassesIcon.FOLDER)
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

    if(props.list.id < 0) {
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
                className="side-bar__item">
                <button className={`side-bar__button button icon ${icon}`} ref={activeRef}
                    onClick={() => {
                        taskManagerContext.actions.switchList(props.list.id)
                        setActiveButton(true)
                    }}>
                    <p className="side-bar__button-title">{props.list.title}</p>
                    <div className="side-bar__button-indications">
                        <span className={`color-indicator ${color}`}></span>
                        <span className="three-dots-menu" onClick={() => {setActiveEditForm(true)}}></span>
                    </div>
                </button>
                <EditListForm list={props.list} activeEditForm={activeEditForm} setActiveEditForm={setActiveEditForm}/>
            </li>
        );
    }
}

export default SideBarButton;