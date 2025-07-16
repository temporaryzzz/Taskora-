import { useState, useCallback, useEffect, createContext} from 'react';
import '../../styles.scss';
import SideBar from './side-bar';
import TaskInfoWindow from './task-info-window';
import TaskList from './task-list';
import InizializateTasks, { FindTask } from '../../scripts/dataTaskManager' 


export type TaskInfo = {
  id: number;
  title: string;
  description: string;
  time: string;
  completed: boolean;
};

type TaskPageType = {
    tasks: Array<TaskInfo> | undefined;
    currentTask: TaskInfo | undefined;
}

export const TaskInfoContext = createContext<TaskPageType | undefined>(undefined);

function TaskPage() {
    const [tasks, setTasks] = useState<Array<TaskInfo> | undefined>()
    const [currentTask, setCurrentTask] = useState<TaskInfo | undefined>()
    const contextValue: TaskPageType = {
        tasks,
        currentTask,
    };

    //С пустым массивом зависимостей выполнится только при монтировании
    useEffect(() => {InizializateTasks().then((data) => {setTasks(data)})}, [])

    //Передаем данные о задаче в фокусе
    const targetTask = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if(event.target instanceof HTMLElement) {
            if(event.target.classList.contains('task-list__task')) {

                FindTask(Number((event.target.id).split('-')[1])).then((data) => setCurrentTask(data))
            }
        }
    }, [])


    return (
        <TaskInfoContext.Provider value={contextValue}>
            <div className='task-page' onClick={event => targetTask(event)}>
                <SideBar />
                <TaskList />
                <TaskInfoWindow />
            </div>    
        </TaskInfoContext.Provider>
    )
}

export default TaskPage;