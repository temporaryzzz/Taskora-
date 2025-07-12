//import { useState, useRef, useEffect } from 'react';
import '../../styles.scss';
import Task from './task';

type TaskInfo = {
    id: number;
    title: string;
    description: string;
    time: string;
    completed: string;
}

type TaskListProps = {
    tasks: Array<TaskInfo>;
}

const SortedTasks = (props: TaskListProps) => {

    return(
        props.tasks.map(task =>
            <Task id={task.id} 
            title={task.title} 
            description={task.description} 
            time={task.time} 
            completed={task.completed}
            key={task.id}/>
        )
    )
}

function TaskList(props: TaskListProps) {


    return (
        <div className='task-list'>
            <h3>INBOX</h3>
                <SortedTasks tasks={props.tasks.filter(task => task.completed === 'false')}/>
            <div className='task-list task-list__completed'>
                <SortedTasks tasks={props.tasks.filter(task => task.completed === 'true')}/>
            </div>
        </div>    
    )
}

export default TaskList;