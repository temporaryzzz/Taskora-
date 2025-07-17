import {useContext} from "react";
import '../../styles.scss';
import Task from './task';
import type { TaskInfo } from './task-page';
import { TaskInfoContext } from "./task-page";
import CreateTaskForm from "./create-task-form";

const SortedTasks = ({ tasks } : {tasks : Array<TaskInfo> | undefined}) => {

    return(
        tasks?.map(task =>
            <Task id={task.id} 
            title={task.title} 
            description={task.description} 
            time={task.time} 
            completed={task.completed}
            key={task.id}/>
        )
    )
}

function TaskList() {

    const taskList = useContext(TaskInfoContext)

    if(taskList != undefined) {

        return (
            <div className='task-list'>
                <CreateTaskForm />
                
                <div className='task-list task-list__section' id='inbox-list'>
                    <SortedTasks tasks={taskList.tasks?.filter(task => task.completed === false)}/>
                </div>

                <div className='task-list task-list__section task-list__section--completed' id='completed-list'>
                    <SortedTasks tasks={taskList.tasks?.filter(task => task.completed === true)}/>
                </div>
            </div>    
        )
    }

    else {
        setTimeout(() => {
            return (
                <div style={{textAlign: 'center', width: '70%'}}>
                    <h2>ПОКА ПУСТО...</h2>
                </div>
            )
        }, 300)
    }
}

export default TaskList;