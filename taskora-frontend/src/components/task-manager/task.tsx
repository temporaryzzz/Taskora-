import { useContext, useEffect, useRef, useState } from 'react';
import { ChangeStateTask } from '../../scripts/dataTaskManager';
import '../../styles.scss';
import type { TaskInfo } from './task-page';
import { TaskInfoContext } from "./task-page";

function Task(task: TaskInfo) {
    const stateClasses ={
        defaultClass: "task-list__task",
        completedClass: "task-list__task--completed"
    }

    const taskList = useContext(TaskInfoContext)

    const taskRef = useRef<HTMLLIElement>(null);
    const taskCheckbox = useRef<HTMLInputElement>(null);
    const [taskCompletedState, setTaskCompletedState] = useState(task.completed)

    const InizializateStateTask = () => {
        if(task.completed === true) {

            if (taskRef.current) taskRef.current.classList.add(stateClasses.completedClass)
            if (taskCheckbox.current) taskCheckbox.current.checked = true  
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

    useEffect(InizializateStateTask, [])

    return (
        <li className='task-list__task' ref={taskRef} id={`task-${task.id}`} onClick={event => taskList?.setCurrentTask(event, task.id)}> 
            <input type='checkbox' id='completed' ref={taskCheckbox} onChange={setStateTask}></input>
            <h4 onClick={event => taskList?.setCurrentTask(event, task.id)}>{task.title}</h4> 
        </li>    
    )
}

export default Task;