import { useEffect, useRef, useState } from 'react';
import '../../styles.scss';

type TaskInfo = {
    id: number;
    title: string;
    description: string;
    time: string;
    completed: string;
}

function Task(task: TaskInfo) {
    const stateClasses ={
        defaultClass: "task-list__task",
        completedClass: "task-list__task--completed"
    }

    const taskRef = useRef<HTMLDivElement>(null);
    const taskCheckbox = useRef<HTMLInputElement>(null);
    const [taskCompletedState, setTaskCompletedState] = useState(false)

    const InizializateStateTask = () => {
        if(task.completed === "true") {
            console.log(taskRef.current)
            if (taskRef.current) taskRef.current.classList.add(stateClasses.completedClass)
            if (taskCheckbox.current) taskCheckbox.current.checked = true  
        }
    }

    const setStateTask = () => { 
        setTaskCompletedState(!taskCompletedState)

        if (taskRef.current) {
            if (taskRef.current.matches(stateClasses.completedClass)) {
                taskRef.current.classList.remove(stateClasses.completedClass)
            }
            else {
                taskRef.current.classList.add(stateClasses.completedClass)
            }
        }

        if (taskCheckbox.current) taskCheckbox.current.checked = !taskCompletedState  

    }

    useEffect(InizializateStateTask, [task.completed])

    return (
        <div className='task-list__task' ref={taskRef}> 
            <input type='checkbox' id='completed' ref={taskCheckbox} onChange={setStateTask}></input>
            <h4>{task.title}</h4> 
            <p>{task.description}</p>
        </div>    
    )
}

export default Task;