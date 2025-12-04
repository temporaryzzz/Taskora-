import { useContext, useEffect, useRef, useState } from "react"
import type { Task } from "../interfaces"
import { TaskManagerContext } from "../App"
import { Calendar } from "./calendar"
import { useOnClickOutside } from "../hooks"


export function TaskDetailsWindow() {
    const [task, setTask] = useState<Task>()
    const [deadlineMessage, setDeadlineMessage] = useState<string>('Установите дату')
    const [taskDeadline, setTaskDeadline] = useState<string |null>(null)
    const [classButtonPriority, setClassButtonPriority] = useState<string>('button button--priority-default')
    const taskManagerContext = useContext(TaskManagerContext)
    const taskDetailsRef = useRef<HTMLDivElement>(null)
    const calendarRef = useRef<HTMLDivElement>(null)
    const taskDetailsTitleRef = useRef<HTMLTextAreaElement>(null)
    const taskDetailsDescriptionRef = useRef<HTMLTextAreaElement>(null)
    const taskDetailsDedlineButtonRef = useRef<HTMLButtonElement>(null)
    const priorityMenuRef = useRef<HTMLDivElement>(null)

    const stateClasses = {
        hidden: 'visually-hidden',
        redButton: 'task-details__button--red',
        activeOptions: 'context-menu--active',
        activeOptionsItem: 'context-menu__item--active',
        btnDefault: 'button button--priority-default',
        btnMiddle: 'button button--priority-middle',
        btnHigh: 'button button--priority-high',
        btnHighest: 'button button--priority-highest',
    }

    const monthState = [
		'янв.',
		'фев.',
		'мар.',
		'апр.',
		'мая',
		'июня',
		'июля',
		'авг.',
		'сент.',
		'окт.',
		'ноя.',
		'дек.',
	];

    if(taskManagerContext == undefined) {
        return
    }

    const InitializationDeadlineMessage = () => {
        if(task && task.deadline !== null) {
            setTaskDeadline(task.deadline)
            const date = new Date(task.deadline)
            let hours = ', ' + String(date.getHours())
            let minutes = ':' + String(date.getMinutes())
            let dateNumber = String(date.getDate())
            let month = monthState[date.getMonth()]
            let year = ''

            if(date.getHours() < 10) {
                hours = ' 0' + String(date.getHours())
            }
            if(date.getMinutes() !== 30) {
                minutes = ':0' + String(date.getMinutes())
            }
            if(date.getMinutes() == 59) {
                hours = ''
                minutes = ''
            }
            if(date.getFullYear() !== new Date().getFullYear()) {
                year = String(date.getFullYear()) + ' '
            }
            if(task && new Date(task.deadline) < new Date()) {
                taskDetailsDedlineButtonRef.current?.classList.add(stateClasses.redButton)
            }
            else {
                taskDetailsDedlineButtonRef.current?.classList.remove(stateClasses.redButton)
            }

            setDeadlineMessage(year + dateNumber + ' ' + month + hours + minutes)
        }
        else {
            setDeadlineMessage('Установите дату')
        }
    }

    const InitializationTask = () => {
        if(taskManagerContext.state.selectedTaskId !== null && taskDetailsRef.current) {
            taskDetailsRef.current.style.display = 'flex'
            setTask(taskManagerContext.state.tasks.find(task => task.id == taskManagerContext.state.selectedTaskId))
        }
        else {
            if(taskDetailsRef.current) {
                taskDetailsRef.current.style.display = 'none'
            }
        }
    }

    const InitializationPriorityButton = () => {
        if(task) {
            switch (task.priority) {
                case 'DEFAULT': {
                    setClassButtonPriority(stateClasses.btnDefault)
                    break
                }
                case 'MIDDLE': {
                    setClassButtonPriority(stateClasses.btnMiddle)
                    break
                }
                case 'HIGH': {
                    setClassButtonPriority(stateClasses.btnHigh)
                    break
                }
                case 'HIGHEST': {
                    setClassButtonPriority(stateClasses.btnHighest)
                    break
                }
            }
        }
    }

    const toggleShowPriority = () => {
        if(priorityMenuRef.current && priorityMenuRef.current) {
            priorityMenuRef.current.classList.toggle(stateClasses.activeOptions)
        }
    }

    const setPriority = (priority: 'DEFAULT' | 'MIDDLE' | 'HIGH' | 'HIGHEST') => {
        if(task) {
            setTask({...task, priority: priority})
            taskManagerContext.actions.updateTask(task.id, {ownerListId: task.ownerListId, title: task.title, description: task.description,
                deadline: taskDeadline, priority: priority, completed: task.completed, section: task.section
            })
        }
    }

    const setDeadline = (date: string | null) => {
        if(task) {
            console.log(date)
            setTaskDeadline(date)
            setTask({...task, deadline: date})
            taskManagerContext.actions.updateTask(task.id, {ownerListId: task.ownerListId, title: task.title, description: task.description,
                deadline: date, priority: task.priority, completed: task.completed, section: task.section
            })
        }
    }

    const toggleShowCalendar = () => {
        calendarRef.current?.classList.toggle(stateClasses.hidden)
    }

    const updateTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(taskDetailsTitleRef.current && task) {
            let title = e.target.value
            setTask({...task, title})
            taskManagerContext.actions.setTempTaskTitle(title)
        }
    }

    const updateTask = () => {
        if(task) {
            console.log(taskDeadline)
            taskManagerContext.actions.updateTask(task.id, {ownerListId: task.ownerListId, title: task.title, description: task.description,
                deadline: taskDeadline, priority: task.priority, completed: task.completed, section: task.section
            })
        }
    }

    useEffect(() => {
        InitializationTask()
    }, [taskManagerContext.state.selectedTaskId])

    useEffect(() => {
        if(taskDetailsDescriptionRef.current && taskDetailsTitleRef.current) {
            taskDetailsTitleRef.current.value = task?.title??''
            taskDetailsDescriptionRef.current.value = task?.description??''
        }
        InitializationDeadlineMessage()
        InitializationPriorityButton()
    }, [task])

    useOnClickOutside(priorityMenuRef, () => {
        if(priorityMenuRef.current && priorityMenuRef.current.classList.contains(stateClasses.activeOptions)) {
             priorityMenuRef.current.classList.remove(stateClasses.activeOptions)
        }
    })

    return(
        <div className="task-details" ref={taskDetailsRef}>
            <textarea className="task-details__input task-details__input--title" 
                        ref={taskDetailsTitleRef} 
                        onChange={(e) => updateTitle(e)}
                        onBlur={updateTask}></textarea>
            <textarea className="task-details__input task-details__input--description" 
                        ref={taskDetailsDescriptionRef}
                        onChange={(e) => {if(task)setTask({...task, description: e.target.value})}}
                        onBlur={updateTask}></textarea>
            <ul className="task-details__subtasks">
                <button className="task-details__button button button--add">Add a subtask</button>
                <li className="task-details__subtask"></li>
            </ul>
            <div className="task-details__footer">
                <div className="task-details__date-wrapper">
                    <div className="task-details__calendar visually-hidden" ref={calendarRef}>
                        <Calendar date={taskDeadline} setDate={setDeadline} toggleShowCalendar={toggleShowCalendar} timeSelectClass="dropdown-menu__items dropdown-menu__items--top"/>
                    </div>
                    <button className="task-details__button button" id="date" ref={taskDetailsDedlineButtonRef} onClick={toggleShowCalendar}>
                        {deadlineMessage}
                    </button>
                </div>
                <button className={classButtonPriority} onClick={toggleShowPriority}>
                    <div className="context-menu context-menu--top" ref={priorityMenuRef}>
                            <label>Priority</label>
                            <ul className="context-menu__items context-menu__items--horizontal">
                                <li id="DEFAULT" className={`context-menu__item ${task && task.priority == 'DEFAULT'?stateClasses.activeOptionsItem:''}`}
                                    onClick={() => {setPriority('DEFAULT')}}>
                                    <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="15.0028" y="4.00842" width="2.30317" height="20.9916" rx="1.15159" fill="#666666"/>
                                        <path d="M12.8606 4.61956C13.5349 4.24337 14.3646 4.7161 14.3611 5.47446L14.3165 15.0366C14.3129 15.8017 13.4654 16.2828 12.7946 15.9006L4.33675 11.0818C3.66593 10.6996 3.67782 9.7424 4.3581 9.36289L12.8606 4.61956Z" fill="#666666"/>
                                    </svg>
                                </li>
                                <li id="MIDDLE" className={`context-menu__item ${task && task.priority == 'MIDDLE'?stateClasses.activeOptionsItem:''}`}
                                onClick={() => {setPriority('MIDDLE')}}>
                                    <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="15.0028" y="4.00842" width="2.30317" height="20.9916" rx="1.15159" fill="#4B29C3"/>
                                        <path d="M12.8606 4.61956C13.5349 4.24337 14.3646 4.7161 14.3611 5.47446L14.3165 15.0366C14.3129 15.8017 13.4654 16.2828 12.7946 15.9006L4.33675 11.0818C3.66593 10.6996 3.67782 9.7424 4.3581 9.36289L12.8606 4.61956Z" fill="#4B29C3"/>
                                    </svg>
                                </li>
                                <li id="HIGH" className={`context-menu__item ${task && task.priority == 'HIGH'?stateClasses.activeOptionsItem:''}`}
                                onClick={() => {setPriority('HIGH')}}>
                                    <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="15.0028" y="4.00842" width="2.30317" height="20.9916" rx="1.15159" fill="#FFD633"/>
                                        <path d="M12.8606 4.61956C13.5349 4.24337 14.3646 4.7161 14.3611 5.47446L14.3165 15.0366C14.3129 15.8017 13.4654 16.2828 12.7946 15.9006L4.33675 11.0818C3.66593 10.6996 3.67782 9.7424 4.3581 9.36289L12.8606 4.61956Z" fill="#FFD633"/>
                                    </svg>
                                </li>
                                <li id="HIGHEST" className={`context-menu__item ${task && task.priority == 'HIGHEST'?stateClasses.activeOptionsItem:''}`} 
                                    onClick={() => {setPriority('HIGHEST')}}>
                                    <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <rect x="15.0028" y="4.00842" width="2.30317" height="20.9916" rx="1.15159" fill="#FF5500"/>
                                        <path d="M12.8606 4.61956C13.5349 4.24337 14.3646 4.7161 14.3611 5.47446L14.3165 15.0366C14.3129 15.8017 13.4654 16.2828 12.7946 15.9006L4.33675 11.0818C3.66593 10.6996 3.67782 9.7424 4.3581 9.36289L12.8606 4.61956Z" fill="#FF5500"/>
                                    </svg>
                                </li>
                            </ul>
                        </div>
                </button>
            </div>
        </div>
    )
}