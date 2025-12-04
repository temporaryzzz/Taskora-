import { useContext, useEffect, useRef, useState } from "react"
import type { Task } from "../interfaces"
import { TaskManagerContext } from "../App"
import { Calendar } from "./calendar"


export function TaskDetailsWindow() {
    const [task, setTask] = useState<Task>()
    const [deadlineMessage, setDeadlineMessage] = useState<string>('Установите дату')
    const [taskDeadline, setTaskDeadline] = useState<string |null>(null)
    const taskManagerContext = useContext(TaskManagerContext)
    const taskDetailsRef = useRef<HTMLDivElement>(null)
    const calendarRef = useRef<HTMLDivElement>(null)
    const taskDetailsTitleRef = useRef<HTMLTextAreaElement>(null)
    const taskDetailsDescriptionRef = useRef<HTMLTextAreaElement>(null)
    const taskDetailsDedlineButtonRef = useRef<HTMLButtonElement>(null)

    const stateClasses = {
        hidden: 'visually-hidden',
        redButton: 'task-details__button--red',
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
    }, [task])

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
            <div className="task-details__date-wrapper">
                <div className="task-details__calendar visually-hidden" ref={calendarRef}>
                    <Calendar date={taskDeadline} setDate={setDeadline} toggleShowCalendar={toggleShowCalendar} timeSelectClass="dropdown-menu__items dropdown-menu__items--top"/>
                </div>
                <button className="task-details__button button" id="date" ref={taskDetailsDedlineButtonRef} onClick={toggleShowCalendar}>
                    {deadlineMessage}
                </button>
            </div>
        </div>
    )
}