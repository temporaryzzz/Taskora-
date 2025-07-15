import { useState, useCallback, useEffect,} from 'react';
import '../../styles.scss';
import SideBar from './side-bar';
import TaskInfoWindow from './task-info-window';
import TaskList from './task-list';
import InizializateTasks, { FindTask } from '../../scripts/dataTaskManager' 

type Task = {
  id: number;
  title: string;
  description: string;
  time: string;
  completed: boolean;
};

function TaskPage() {
    const [tasks, setTasks] = useState<Task[]>()
    const [currentTask, setCurrentTask] = useState<Task>()
    useEffect(() => {InizializateTasks().then((data) => {setTasks(data)})}, [])//С пустым массивом зависимостей выполнится только при монтировании

    //Передаем данные о задаче в фокусе
    const targetTask = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if(event.target instanceof HTMLElement) {
            if(event.target.classList.contains('task-list__task')) {

                FindTask(Number((event.target.id).split('-')[1])).then((data) => setCurrentTask(data))
            }
        }
    }, [])


    return (
        <div className='task-page' onClick={event => targetTask(event)}>
            <SideBar />
            <TaskList tasks={tasks?tasks:undefined} />
            <TaskInfoWindow task={currentTask?currentTask:undefined}/>
        </div>    
    )
}

export default TaskPage;