//import { useState, useRef, useEffect } from 'react';
import '../../styles.scss';
import Task from './task';

type TaskInfo = {
    id: number;
    title: string;
    description: string;
    time: string;
    completed: boolean;
}

type TaskListProps = {
    tasks?: Array<TaskInfo>;
}

const SortedTasks = (props: TaskListProps) => {

    return(
        props.tasks?.map(task =>
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
            <div className='task-list task-list__section' id='inbox-list'>
                <SortedTasks tasks={props.tasks?.filter(task => task.completed === false)}/>
            </div>
            <div className='task-list task-list__section task-list__section--completed' id='completed-list'>
                <SortedTasks tasks={props.tasks?.filter(task => task.completed === true)}/>
            </div>
        </div>    
    )
}

export default TaskList;