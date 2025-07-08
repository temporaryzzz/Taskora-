//import { useState, useRef, useEffect } from 'react';
import '../../styles.scss';
import Task from './task';


function TaskList() {
    

    return (
        <div className='task-list'>
            <h3>INBOX</h3>
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />

            <h3>COMPLETED</h3>
            <div className='task-list__completed'>
                <Task />
                <Task />
            </div>
        </div>    
    )
}

export default TaskList;