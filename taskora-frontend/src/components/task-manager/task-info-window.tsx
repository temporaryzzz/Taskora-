import { useEffect, useState, useContext } from 'react';
import '../../styles.scss';
import { TaskInfoContext } from "./task-page";


function TaskInfoWindow() {
    const taskList = useContext(TaskInfoContext)

    if(taskList?.currentTask == undefined) {
        return (
            <div className='task-info-winow' style={{visibility:`visible`}}>
            </div>
        )
    }

    const [taskTitle, setTaskTitle] = useState<string | undefined>(taskList.currentTask.title)
    const [taskDescription, setTaskDescription] = useState<string | undefined>(taskList.currentTask.description)

    useEffect(() => {
        setTaskTitle(taskList.currentTask?.title)
        setTaskDescription(taskList.currentTask?.description)
    }, [taskList])

    return (
        <div className='task-info-winow'>
            <textarea className='task-info-winow task-info-winow__title' 
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}>
            </textarea>
            <textarea className='task-info-winow task-info-winow__description' 
                value={taskDescription}
                placeholder='Добавьте описание...'
                onChange={(e) => setTaskDescription(e.target.value)}>
            </textarea>
        </div>    
    )
}

export default TaskInfoWindow;