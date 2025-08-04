import { useContext, useEffect, useRef, useState } from 'react';
import { ChangeStateTask } from '../../scripts/dataTaskManager';
import '../../styles.scss';
import type { TaskInfo } from './task-page';
import { TaskInfoContext } from "./task-page";
import ContextMenu from '../contextMenu';

function Task(task: TaskInfo) {
    const stateClasses ={
        defaultClass: "task-list__task",
        completedClass: "task-list__task--completed",
        activeClass: "task-list__task--active"
    }

    const stateColors = {
        red: '#d52b24',
        blue: '#1962e8',
        green: '#238636',
        gray: '#818c99b3',
    }

    const taskManagerContext = useContext(TaskInfoContext)

    const taskRef = useRef<HTMLLIElement>(null);
    const taskCheckbox = useRef<HTMLInputElement>(null);

    const [taskCompletedState, setTaskCompletedState] = useState(task.completed)
    const [contextMenuActive, setContextMenuActive] = useState(false)
    const [mouseX, setMouseX] = useState<number>(0)
    const [mouseY, setMouseY] = useState<number>(0)

    const InizializateTask = () => {
        if(task.completed === true) {

            if (taskRef.current) taskRef.current.classList.add(stateClasses.completedClass)

            if (taskCheckbox.current) {
                taskCheckbox.current.checked = true  
            }
        }

        if (taskCheckbox.current) {
            switch (task.priority){
                case 'red' :
                    taskCheckbox.current.style.borderColor = stateColors.red
                    break
                case 'blue' :
                    taskCheckbox.current.style.borderColor = stateColors.blue
                    break
                case 'green' :
                    taskCheckbox.current.style.borderColor = stateColors.green
                    break
                case 'default' :
                    taskCheckbox.current.style.borderColor = stateColors.gray
                    break
            }
        }
    }

    const setStateTask = () => { 
        setTaskCompletedState(!taskCompletedState)

        if (taskCheckbox.current){

            taskCheckbox.current.checked = !taskCompletedState  

            if (taskRef.current) {
                if (taskCheckbox.current.checked == false) {
                    taskRef.current.classList.remove(stateClasses.completedClass)
                    document.getElementById('inbox-list')?.appendChild(taskRef.current)
                }
                else {
                    taskRef.current.classList.add(stateClasses.completedClass)
                    document.getElementById('completed-list')?.appendChild(taskRef.current)
                }
            }
        }

        ChangeStateTask(taskCompletedState, task.id)

    }

    const setActiveClass = () => {
        if(taskRef.current) {
            if(taskManagerContext?.currentTaskInfo?.id == task.id) {
                taskRef.current.classList.add(stateClasses.activeClass)
            }
            else {
                taskRef.current.classList.remove(stateClasses.activeClass)
            }
        }
    }

    const OnMouseUp = (event: React.MouseEvent<HTMLLIElement | HTMLHeadingElement>) => {
        taskManagerContext?.setCurrentTask(event, task.id)
        setContextMenuActive(false)
    }

    const OnContextMenu = (event: React.MouseEvent<HTMLLIElement | HTMLHeadingElement>) => {
        event.preventDefault()
        const taskListElement = document.querySelector('.task-list')
        
        if(taskListElement) {
            const {left, top} = taskListElement.getBoundingClientRect()
            setMouseX(event.clientX - (left - taskListElement.scrollLeft)) 
            setMouseY(event.clientY - (top - taskListElement.scrollTop))
            setContextMenuActive(!contextMenuActive)
        }
    }

    const setPriority = (color: string, priority: 'red' | 'blue' | 'green' | 'default') => {
        if(taskCheckbox.current) {
            taskCheckbox.current.style.borderColor = color
            if(taskManagerContext?.currentTaskInfo) {
                const currentTask = taskManagerContext.currentTaskInfo
                currentTask.priority = priority
                taskManagerContext.changeCurrentTask(currentTask.title, currentTask.description, currentTask.date, currentTask.time, priority)
            }
        }
    }

    document.addEventListener('mousedown', () => { setContextMenuActive(false) })

    useEffect(InizializateTask, [])
    useEffect(setActiveClass, [taskManagerContext?.currentTaskInfo])

    return (
        <li className='task-list__task' 
            ref={taskRef} id={`task-${task.id}`} 
            onMouseUp={event => OnMouseUp(event)} 
            onContextMenu={event => OnContextMenu(event)}> 
            
            <input type='checkbox' id='completed' ref={taskCheckbox} onChange={setStateTask}></input>
            <h4 onMouseUp={event => OnMouseUp(event)}>{task.title}</h4>
            <ContextMenu setColorPriority={setPriority} active={contextMenuActive} x={mouseX} y={mouseY}/> 

        </li>    
    )
}

export default Task;