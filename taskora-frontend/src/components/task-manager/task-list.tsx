import {useContext, useRef, type RefObject} from "react";
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
            date={task.date}
            time={task.time} 
            completed={task.completed}
            priority={task.priority}
            key={task.id}/>
        )
    )
}

function TaskList() {

    const taskManagerContext = useContext(TaskInfoContext)
    const taskListCompletedRef = useRef<HTMLUListElement>(null)

    const changeVisibleList = (list: RefObject<HTMLUListElement | null>) => {
        if(list.current) {
            if(list.current.style.display == 'none') {
                list.current.style.display = 'block'
            }
            else {
                list.current.style.display = 'none'
            }
        }
    }

    if(taskManagerContext != undefined) {

        return (
            <div className='task-list'>
                <CreateTaskForm />

                <ul className='task-list__section' id='inbox-list'>
                    <SortedTasks tasks={taskManagerContext.tasks?.filter(task => task.completed === false)}/>
                </ul>

                <span className='task-list__title' onClick={() => changeVisibleList(taskListCompletedRef)}>
                    <h5 style={{float: 'left', fontWeight: 700}}>Выполнено</h5>
                </span>

                <ul className='task-list__section task-list__section--completed' ref={taskListCompletedRef} id='completed-list'>
                    <SortedTasks tasks={taskManagerContext.tasks?.filter(task => task.completed === true)}/>
                </ul>
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