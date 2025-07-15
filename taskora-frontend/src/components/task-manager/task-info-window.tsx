//import { useMemo, useState } from 'react';
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
    
    return (
        <div className='task-info-winow'>
            <h2>TASK-INFO-WINDOW</h2> 
            <h3>{taskInfo.task?.title}</h3>
            <p>{taskInfo.task?.description}</p>
        </div>    
    )
}

export default TaskInfoWindow;