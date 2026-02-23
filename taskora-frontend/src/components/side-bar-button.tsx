import { memo, useContext, useEffect, useRef, useState } from "react";import { SYSTEM_LIST_IDS } from "../constants";import type { List } from "../interfaces";
import { StateContext, ActionsContext } from "../App";
import { EditListForm } from "./edit-list-form";
import { useOnClickOutside } from "../hooks";


type SideBarButtonProps = { list: List };

const stateClassesIcon = {
    DEFAULT: "icon--circle-default",
    LINES: "icon--lines",
    SHEET: "icon--sheet",
    FOLDER: "icon--folder",
    INBOX: "icon--inbox",
    ALL: "icon--all",
    COMPLETED: "icon--completed",
    BASKET: "icon--basket",
    CASE: "icon--case",
    TODAY: "icon--today",
    GEAR: "icon--gear",
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

const stateClasses = {
    activeOptions: 'context-menu--active',
}

function SideBarButton(props: SideBarButtonProps) {
	const state = useContext(StateContext);
	const actions = useContext(ActionsContext);
	const activeRef = useRef<HTMLButtonElement>(null);
    const contextMenuRef = useRef<HTMLDivElement>(null)
    const [icon, setIcon] = useState<string>()
    const [color, setColor] = useState<string>()
    const [activeEditForm, setActiveEditForm] = useState<boolean>(false)
    const [content, setContent] = useState('');

    if(state == undefined || actions == undefined) {
        return
    }

    //Не мемеоизируем т.к. это не ресурсно затратная операции
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
            case 'CASE':
                setIcon(stateClassesIcon.CASE)
                break;
            case 'GEAR':
                setIcon(stateClassesIcon.GEAR)
                break;
            case 'TODAY':
                setIcon(stateClassesIcon.TODAY)
                setContent(String(new Date().getDate()))
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

	const toggleContexMenuActive = () => {
        contextMenuRef.current?.classList.toggle(stateClasses.activeOptions)
	};

	useEffect(() => {
		if (state.currentList?.id == props.list.id) {
			setActiveButton(true);
		} else {
			setActiveButton(false);
		}
	}, [state.currentList]);

    useEffect(() => {
        InitializationButtonIcon()
    }, [props.list.icon])

    useEffect(() => {
        InitializationColorIndicator()
    }, [props.list.color])

    useOnClickOutside(contextMenuRef, () => {
        if(contextMenuRef.current) {
            contextMenuRef.current.classList.remove(stateClasses.activeOptions)
        }
    })

    if(SYSTEM_LIST_IDS.COMPLETED === props.list.id || SYSTEM_LIST_IDS.TODAY === props.list.id || SYSTEM_LIST_IDS.BASKET === props.list.id || SYSTEM_LIST_IDS.ALL === props.list.id) {
        return (
            <li 
                className="side-bar__item" 
                onClick={() => {
                        if(props.list.id !== state.currentList?.id) {
                            actions.switchList(props.list.id)
                            setActiveButton(true)
                        }
                    }}>
                <button className={`side-bar__button button icon ${icon}`} ref={activeRef} data-content={content}>
                    {props.list.title}
                </button>
            </li>
        );
    }
    else {
        return (
            <>
                <li 
                    className="side-bar__item">
                    <button className={`side-bar__button button icon ${icon}`} ref={activeRef}
                        onClick={() => {
                            if(props.list.id !== state.currentList?.id) {
                                actions.switchList(props.list.id)
                                setActiveButton(true)
                            }
                        }}>
                        <p className="side-bar__button-title">{props.list.title}</p>
                        <div className="side-bar__button-indications">
                            <span className={`color-indicator ${color}`}></span>
                            <span className="three-dots-menu" onClick={toggleContexMenuActive}></span>
                        </div>
                    </button>
                    <div className="context-menu context-menu--left" ref={contextMenuRef}>
                        <ul className="context-menu__items">
                            <li className="context-menu__item context-menu__item--button" onClick={() => {
                                setActiveEditForm(true)
                                toggleContexMenuActive()
                                }}>
                                <p>Редактировать</p>
                            </li>
                            <li className="context-menu__item context-menu__item--red" onClick={() => {
                                actions.deleteList(props.list.id)
                                toggleContexMenuActive()
                                //switch all
                                actions.switchList(SYSTEM_LIST_IDS.ALL)
                                }}>
                                <p>Удалить</p>
                            </li>
                        </ul>
                    </div>
                </li>
                <EditListForm list={props.list} activeEditForm={activeEditForm} setActiveEditForm={setActiveEditForm}/>
            </>
        );
    }
}

export default memo(SideBarButton);