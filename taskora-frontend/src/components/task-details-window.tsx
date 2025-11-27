import { useContext, useEffect, useRef, useState } from "react"
import type { Task } from "../interfaces"
import { TaskManagerContext } from "../App"


export function TaskDetailsWindow() {
    const [task, setTask] = useState<Task>()
    const taskManagerContext = useContext(TaskManagerContext)
    const taskDetailsRef = useRef<HTMLDivElement>(null)
    const taskDetailsTitleRef = useRef<HTMLTextAreaElement>(null)
    const taskDetailsDescriptionRef = useRef<HTMLTextAreaElement>(null)
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if(taskManagerContext == undefined) {
        return
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

    const updateTitle = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        if(timeoutId !== null) {
            clearTimeout(timeoutId)
        }
        if(taskDetailsTitleRef.current && task) {
            let title = e.target.value
            setTask({...task, title})
            taskManagerContext.actions.setTempTaskTitle(title)

            timeoutId = setTimeout(() => {
                updateTask()
            }, 3000)
        }
    }

    const updateTask = () => {
        if(task) {
            taskManagerContext.actions.updateTask({ownerListId: task.ownerListId, title: task.title, description: task.description,
                deadline: task.deadline, priority: task.priority, completed: task.completed, section: task.section
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
            <div className="task-details__buttons-wrapper">
                <button className="task-details__button button" id="date"></button>
            </div>
        </div>
    )
}