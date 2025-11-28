import { useContext, useEffect, useRef, useState } from "react"
import type { Task } from "../interfaces"
import { TaskManagerContext } from "../App"

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
    const [dateMessage, setDateMessage] = useState('');

    const stateClasses = {
        DEFAULT: '',
        MIDDLE: 'task__checkbox--middle',
        HIGH: 'task__checkbox--high',
        HIGHEST: 'task__checkbox--highest',
        active: 'task--active',
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
            taskManagerContext.actions.setSelectedTask(props.task.id)
            taskElementRef.current?.classList.toggle('task--completed')   
            taskManagerContext.actions.updateTask({...props.task, completed: checkboxElementRef.current.checked})
        }
    }

    const InitializationCheckbox = () => {
        switch(props.task.priority) {
            case('DEFAULT'): {
                break
            }
            case('MIDDLE'): {
                checkboxElementRef.current?.classList.add(stateClasses.MIDDLE)
                break
            }
            case('HIGH'): {
                checkboxElementRef.current?.classList.add(stateClasses.HIGH)
                break
            }
            case('HIGHEST'): {
                checkboxElementRef.current?.classList.add(stateClasses.HIGHEST)
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

    useEffect(() => {
        InitializationCheckbox()
        if (props.task.deadline == null) {
			setDateMessage('');
		} 
        else {
			const date = new Date(props.task.deadline).getDate();
			const month = new Date(props.task.deadline).getMonth();
			let hours = new Date(props.task.deadline).getHours() - 3;
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

    return(
        <li className="task" ref={taskElementRef} onClick={() => taskManagerContext.actions.setSelectedTask(props.task.id)}>
            <div className="task__body">
                <input type="checkbox" className="task__checkbox" 
                    onChange={() => toggleCompleted()} 
                    ref={checkboxElementRef}/>
                <h3 className="task__title h5">{props.task.id == taskManagerContext.state.selectedTaskId ? taskManagerContext.state.tempTaskTitle : props.task.title}</h3>
            </div>
            <div className="task__extra">
                <p className="task__date">{dateMessage}</p>
            </div>
        </li>
    )
}