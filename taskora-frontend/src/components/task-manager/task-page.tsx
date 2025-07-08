//import { useState, useRef, useEffect } from 'react';
import '../../styles.scss';
import SideBar from './side-bar';
import TaskList from './task-list';


function TaskPage() {


    return (
        <div style={{display: 'flex'}}>
            <SideBar />
            <TaskList />
        </div>    
    )
}

export default TaskPage;