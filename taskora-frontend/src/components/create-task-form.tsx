import { useContext, useEffect, useRef, useState, type Dispatch, type FormEvent, type SetStateAction } from "react";
import { TaskManagerContext } from "../App";
import type { CreateTaskDTO} from "../interfaces";
import { useOnClickOutside } from "../hooks";
import { Calendar } from "./calendar";

type CreateTaskFormProps = {
    section: string
    showForm: boolean
    setShowForm: Dispatch<SetStateAction<boolean>>
}

export function CreateTaskForm(props: CreateTaskFormProps) {
    const taskManagerContext = useContext(TaskManagerContext)

    if(taskManagerContext == undefined || taskManagerContext.state.currentList == undefined) {
        return
    }

    const inputAddTaskRef = useRef<HTMLInputElement>(null)
    const optionsRef = useRef<HTMLDivElement>(null)
    const calendarRef = useRef<HTMLDivElement>(null)
    const calendarButtonRef = useRef<HTMLSpanElement>(null)
    const optionsButtonRef = useRef<HTMLSpanElement>(null)
    const formAddTaskRef = useRef<HTMLFormElement>(null)
    const [taskBeingCreated, setTaskBeingCreated] = useState<CreateTaskDTO>({ownerListId: taskManagerContext.state.currentList.id, title: '', description: '', 
        priority: 'DEFAULT', section: props.section, deadline: null})
    const stateClasses = {
        hidden: 'visually-hidden',
        activeOptions: 'context-menu--active',
        activeOptionsItem: 'context-menu__item--active',
        activeButton: 'task-list__section-button--active',
    }

    const toggleShowOptions = () => {
        if(optionsRef.current && optionsButtonRef.current) {
            optionsRef.current.classList.toggle(stateClasses.activeOptions)
            optionsButtonRef.current.classList.toggle(stateClasses.activeButton)
        }
    }

    const toggleShowCalendar = () => {
        if(calendarRef.current && calendarButtonRef.current) {
            calendarRef.current.classList.toggle(stateClasses.activeOptions)
            calendarButtonRef.current.classList.toggle(stateClasses.activeButton)
        }
    }

    const setPriority = (priority: 'HIGHEST' | 'HIGH' | 'MIDDLE' | 'DEFAULT') => {
        setTaskBeingCreated({...taskBeingCreated, priority: priority})
    }

    const setDateDeadline = (date: string | null) => {
        setTaskBeingCreated({...taskBeingCreated, deadline: date})
    }

    const handleCreateTask = (event: FormEvent) => {
        event.preventDefault()
        if(/\S/.test(taskBeingCreated.title)) {
            taskManagerContext.actions.createTask(taskBeingCreated)
            console.log(taskBeingCreated)
        }
        clear()
    }

    const clear = () => {
        if(taskManagerContext.state.currentList) {
            setTaskBeingCreated({ownerListId: taskManagerContext.state.currentList.id, title: '', description: '', 
            priority: 'DEFAULT', section: props.section, deadline: null})
        }
        if(formAddTaskRef.current && inputAddTaskRef.current && optionsRef.current) {
            formAddTaskRef.current.classList.add(stateClasses.hidden)
            optionsRef.current.classList.remove(stateClasses.activeOptions)
            inputAddTaskRef.current.blur()
            inputAddTaskRef.current.value = '' 
        }
    }

    const showAddTaskForm = () => {
        if(formAddTaskRef.current && props.showForm == true) {
            formAddTaskRef.current.classList.remove(stateClasses.hidden)
            inputAddTaskRef.current?.focus()
        }
    }

    useOnClickOutside(formAddTaskRef, () => {
        if (formAddTaskRef.current) {
            formAddTaskRef.current.classList.add(stateClasses.hidden);
            inputAddTaskRef.current?.blur();
            optionsRef.current?.classList.remove(stateClasses.activeOptions)
            props.setShowForm(false)
        }
    })

    useEffect(() => {
        showAddTaskForm()
    }, [props.showForm])

    return (
        <form 
            ref={formAddTaskRef} 
            onSubmit={(e) => handleCreateTask(e)}
            className="task-list__section-title-wrapper task-list__section-title-wrapper--full-width visually-hidden">
            <div className="task-list__section-title-wrapper task-list__section-title-wrapper--full-width bordered">
                <label htmlFor="add-task" className="visually-hidden">
                    Введите название новой задачи
                </label>
                <input 
                    type="text" 
                    className="task-list__section-input task-list__section-input--transparent" 
                    id='add-task'
                    placeholder="New task"
                    ref={inputAddTaskRef}
                    autoComplete="off"
                    onChange={(e) => {setTaskBeingCreated({...taskBeingCreated, title: e.target.value})}}
                />
                <span>
                    <span className="task-list__section-button button button--options" ref={optionsButtonRef} onClick={toggleShowOptions}>
                        <div className="context-menu" ref={optionsRef}>
                            <label>Priority</label>
                            <ul className="context-menu__items context-menu__items--horizontal">
                                <li id="DEFAULT" className={`context-menu__item ${taskBeingCreated.priority == 'DEFAULT'?stateClasses.activeOptionsItem:''}`} 
                                    onClick={() => {setPriority('DEFAULT')}}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="1" y="1" width="18" height="18" rx="3" stroke="#666666" strokeWidth="2"/>
                                    </svg>
                                </li>
                                <li id="MIDDLE" className={`context-menu__item ${taskBeingCreated.priority == 'MIDDLE'?stateClasses.activeOptionsItem:''}`} 
                                    onClick={() => {setPriority('MIDDLE')}}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="1" y="1" width="18" height="18" rx="3" stroke="#4B29C3" strokeWidth="2"/>
                                    </svg>
                                </li>
                                <li id="HIGH" className={`context-menu__item ${taskBeingCreated.priority == 'HIGH'?stateClasses.activeOptionsItem:''}`}  
                                    onClick={() => {setPriority('HIGH')}}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="1" y="1" width="18" height="18" rx="3" stroke="#FFD633" strokeWidth="2"/>
                                    </svg>
                                </li>
                                <li id="HIGHEST" className={`context-menu__item ${taskBeingCreated.priority == 'HIGHEST'?stateClasses.activeOptionsItem:''}`} 
                                    onClick={() => {setPriority('HIGHEST')}}>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="1" y="1" width="18" height="18" rx="3" stroke="#FF5500" strokeWidth="2"/>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                    </span>
                    <span className="task-list__section-button button button--date" ref={calendarButtonRef} onClick={toggleShowCalendar}>
                        <div className="context-menu context-menu--wrapper" ref={calendarRef}>
                            <Calendar date={taskBeingCreated.deadline} setDate={setDateDeadline} toggleShowCalendar={toggleShowCalendar} timeSelectClass="dropdown-menu__items"/>
                        </div>
                    </span>
                </span>
            </div>
        </form>
    )
}