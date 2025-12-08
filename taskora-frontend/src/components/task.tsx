import { useContext, useEffect, useRef, useState } from "react"
import type { Task } from "../interfaces"
import { TaskManagerContext } from "../App"
import { useOnClickOutside } from "../hooks"

type TaskProps = {
    task: Task
}

export function TaskComponent(props: TaskProps) {
    const taskManagerContext = useContext(TaskManagerContext)
    if(taskManagerContext == undefined) {
        return
    }

    const taskElementRef = useRef<HTMLLIElement>(null)
    const checkboxElementRef = useRef<HTMLInputElement>(null)
    const contextMenuRef = useRef<HTMLDivElement>(null)
    const [classTaskDate, setClassTaskDate] = useState<string>('task__date')
    const [classTaskCheckbox, setClassTaskCheckbox] = useState<string>('task__checkbox')
    const [dateMessage, setDateMessage] = useState('');

    const stateClasses = {
        DEFAULT: 'task__checkbox',
        MIDDLE: 'task__checkbox task__checkbox--middle',
        HIGH: 'task__checkbox task__checkbox--high',
        HIGHEST: 'task__checkbox task__checkbox--highest',
        active: 'task--active',
        activeOptions: 'context-menu--active',
        activeOptionsItem: 'context-menu__item--active',
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
		'сен.',
		'окт.',
		'ноя.',
		'дек.',
	];

    const toggleCompleted = () => {
        if(checkboxElementRef.current) {
            taskElementRef.current?.classList.toggle('task--completed')   
            console.log(checkboxElementRef.current.checked)
            taskManagerContext.actions.updateTask(props.task.id, {...props.task, completed: checkboxElementRef.current.checked})
        }
    }

    const showContextMenu = (event: React.MouseEvent<HTMLLIElement, MouseEvent>) => {
        if(contextMenuRef.current && event.pageY < window.innerHeight/2) {
            contextMenuRef.current.style.top = String(event.pageY) + 'px'
            contextMenuRef.current.style.bottom = 'auto'
            contextMenuRef.current.style.left = String(event.pageX) + 'px'
            contextMenuRef.current.classList.add(stateClasses.activeOptions)
        }
        if(contextMenuRef.current && event.pageY > window.innerHeight/2) {
            contextMenuRef.current.style.bottom = String(window.innerHeight - event.pageY) + 'px'
            contextMenuRef.current.style.top = 'auto'
            contextMenuRef.current.style.left = String(event.pageX) + 'px'
            contextMenuRef.current.classList.add(stateClasses.activeOptions)
        }
    }

    const InitializationCheckbox = () => {
        switch(props.task.priority) {
            case('DEFAULT'): {
                setClassTaskCheckbox(stateClasses.DEFAULT)
                break
            }
            case('MIDDLE'): {
                setClassTaskCheckbox(stateClasses.MIDDLE)
                break
            }
            case('HIGH'): {
                setClassTaskCheckbox(stateClasses.HIGH)
                break
            }
            case('HIGHEST'): {
                setClassTaskCheckbox(stateClasses.HIGHEST)
                break
            }
        }

        if(props.task.completed) {
            taskElementRef.current?.classList.add('task--completed')
            if(checkboxElementRef.current) {
                checkboxElementRef.current.checked = true
            }
        }
        else {
            if(checkboxElementRef.current) {
                checkboxElementRef.current.checked = false
            }
        }
    }

    const updatePriority = (priority: 'DEFAULT' | 'MIDDLE' | 'HIGH' | 'HIGHEST') => {
        taskManagerContext.actions.updateTask(props.task.id, {...props.task, priority: priority})
    }

    const updateDeadline = (date: number) => {
        let newDate = new Date()
        newDate.setDate(newDate.getDate() + date)

        if(props.task.deadline !== null) {
            newDate.setHours(new Date(props.task.deadline).getHours())
            newDate.setMinutes(new Date(props.task.deadline).getMinutes())
        }
        else {
            newDate.setMinutes(59)
        }

        taskManagerContext.actions.updateTask(props.task.id, {...props.task, deadline: newDate.toISOString()})
    }

    useEffect(() => {
        InitializationCheckbox()
        if (props.task.deadline == null) {
			setDateMessage('');
		} 
        else {
			const date = new Date(props.task.deadline).getDate();
			const month = new Date(props.task.deadline).getMonth();
			let hours = new Date(props.task.deadline).getHours();
			let minutes = new Date(props.task.deadline).getMinutes(); 

            if (minutes != 59) {
				setDateMessage(
					String(date) +
						' ' +
						monthState[month] +
						'  ' +
						String(hours < 10 ? '0' + String(hours) : hours) +
						':' +
						String(minutes < 10 ? '0' + String(minutes) : minutes));
			} else {
				setDateMessage(String(date) + ' ' + monthState[month]);
			}

            if(new Date(props.task.deadline) < new Date()) {
                setClassTaskDate('task__date task__date--red')
            }
            else {
                setClassTaskDate('task__date')
            }
        }
    }, [props.task])

    useEffect(() => {
        if(taskManagerContext.state.selectedTaskId == props.task.id) {
            taskElementRef.current?.classList.add(stateClasses.active)
        }
        else {
            if(taskElementRef.current?.classList.contains(stateClasses.active)) {
                taskElementRef.current?.classList.remove(stateClasses.active)
            }
        }
    }, [taskManagerContext.state.selectedTaskId])

    useOnClickOutside(contextMenuRef, () => {
        if(contextMenuRef.current) {
            contextMenuRef.current.classList.remove(stateClasses.activeOptions)
        }
    })

    return(
        <li className="task" ref={taskElementRef} 
            onClick={() => taskManagerContext.actions.setSelectedTask(props.task.id)}
            onContextMenu={(e) => {
                e.preventDefault()
                showContextMenu(e)
            }}>
            <div className="task__body">
                <input type="checkbox" className={classTaskCheckbox}
                    onChange={() => toggleCompleted()} 
                    ref={checkboxElementRef}/>
                <h3 className="task__title h5">{props.task.id == taskManagerContext.state.selectedTaskId ? taskManagerContext.state.tempTaskTitle : props.task.title}</h3>
            </div>
            <div className="task__extra">
                <p className={classTaskDate}>{dateMessage}</p>
            </div>
            <div className="context-menu" ref={contextMenuRef}>
                <label htmlFor="Priority">Priority</label>
                <ul className="context-menu__items context-menu__items--horizontal" id="Priority">
                    <li id="DEFAULT" className={`context-menu__item ${props.task && props.task.priority == 'DEFAULT'?stateClasses.activeOptionsItem:''}`}
                        onClick={() => {updatePriority('DEFAULT')}}>
                        <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="15.0028" y="4.00842" width="2.30317" height="20.9916" rx="1.15159" fill="#666666"/>
                            <path d="M12.8606 4.61956C13.5349 4.24337 14.3646 4.7161 14.3611 5.47446L14.3165 15.0366C14.3129 15.8017 13.4654 16.2828 12.7946 15.9006L4.33675 11.0818C3.66593 10.6996 3.67782 9.7424 4.3581 9.36289L12.8606 4.61956Z" fill="#666666"/>
                        </svg>
                    </li>
                    <li id="MIDDLE" className={`context-menu__item ${props.task && props.task.priority == 'MIDDLE'?stateClasses.activeOptionsItem:''}`}
                    onClick={() => {updatePriority('MIDDLE')}}>
                        <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="15.0028" y="4.00842" width="2.30317" height="20.9916" rx="1.15159" fill="#4B29C3"/>
                            <path d="M12.8606 4.61956C13.5349 4.24337 14.3646 4.7161 14.3611 5.47446L14.3165 15.0366C14.3129 15.8017 13.4654 16.2828 12.7946 15.9006L4.33675 11.0818C3.66593 10.6996 3.67782 9.7424 4.3581 9.36289L12.8606 4.61956Z" fill="#4B29C3"/>
                        </svg>
                    </li>
                    <li id="HIGH" className={`context-menu__item ${props.task && props.task.priority == 'HIGH'?stateClasses.activeOptionsItem:''}`}
                    onClick={() => {updatePriority('HIGH')}}>
                        <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="15.0028" y="4.00842" width="2.30317" height="20.9916" rx="1.15159" fill="#FFD633"/>
                            <path d="M12.8606 4.61956C13.5349 4.24337 14.3646 4.7161 14.3611 5.47446L14.3165 15.0366C14.3129 15.8017 13.4654 16.2828 12.7946 15.9006L4.33675 11.0818C3.66593 10.6996 3.67782 9.7424 4.3581 9.36289L12.8606 4.61956Z" fill="#FFD633"/>
                        </svg>
                    </li>
                    <li id="HIGHEST" className={`context-menu__item ${props.task && props.task.priority == 'HIGHEST'?stateClasses.activeOptionsItem:''}`} 
                        onClick={() => {updatePriority('HIGHEST')}}>
                        <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect x="15.0028" y="4.00842" width="2.30317" height="20.9916" rx="1.15159" fill="#FF5500"/>
                            <path d="M12.8606 4.61956C13.5349 4.24337 14.3646 4.7161 14.3611 5.47446L14.3165 15.0366C14.3129 15.8017 13.4654 16.2828 12.7946 15.9006L4.33675 11.0818C3.66593 10.6996 3.67782 9.7424 4.3581 9.36289L12.8606 4.61956Z" fill="#FF5500"/>
                        </svg>
                    </li>
                </ul>
                <div className="context-menu__border"></div>
                <ul className="context-menu__items">
                    <li className="context-menu__item context-menu__item--button" onClick={() => updateDeadline(0)}>
                        <p>Назначить на сегодня</p>
                    </li>
                    <li className="context-menu__item context-menu__item--button" onClick={() => updateDeadline(1)}>
                        <p>Перенести на завтра</p>
                    </li>
                    <li className="context-menu__item context-menu__item--button" onClick={() => updateDeadline(7)}>
                        <p>Перенести на след. неделю</p>
                    </li>
                    <div className="context-menu__border"></div>
                    {taskManagerContext.state.currentList?.id == -3?
                    <li className="context-menu__item context-menu__item--accent" onClick={() => taskManagerContext.actions.taskRecovery(props.task.id)}>
                        <p>Восстановить</p>
                    </li>:
                    <li className="context-menu__item context-menu__item--red" onClick={() => {taskManagerContext.actions.deleteTask(props.task.id)}}>
                        <p>Удалить</p>
                    </li>
                    }
                </ul>
            </div>
        </li>
    )
}