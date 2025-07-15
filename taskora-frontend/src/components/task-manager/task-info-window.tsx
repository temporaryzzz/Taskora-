import { useEffect, useState } from 'react';
import '../../styles.scss';

type TaskInfo = {
    id: number;
    title: string;
    description: string;
    time: string;
    completed: boolean;
}

type TaskInfoWindowProps = {
    task?: TaskInfo;
}

function TaskInfoWindow(taskInfo: TaskInfoWindowProps) {
    const [taskTitle, setTaskTitle] = useState(taskInfo.task?.title)
    const [taskDescription, setTaskDescription] = useState(taskInfo.task?.description)

    useEffect(() => {
        setTaskTitle(taskInfo.task?.title)
        setTaskDescription(taskInfo.task?.description)
    }, [taskInfo])

    return (
        <div className='task-info-winow' style={{visibility:`${taskInfo.task == undefined? 'hidden': 'visible'}`}}>
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