import { useMemo, useState } from 'react';
import '../../styles.scss';
import SideBar from './side-bar';
import TaskInfoWindow from './task-info-window';
import TaskList from './task-list';
import InizializateTasks from '../../scripts/dataTaskManager' 

function TaskPage() {
    const [tasks, setTasks] = useState()
    useMemo(async () => {await InizializateTasks().then((data) => {setTasks(data)})}, [])


    return (
        <div className='task-page'>
            <SideBar />
            <TaskList tasks={tasks?tasks:[{id: -1, title: 'null', description: 'null', time: 'null', completed: 'null' }]}/>
            <TaskInfoWindow />
        </div>    
    )
}

export default TaskPage;