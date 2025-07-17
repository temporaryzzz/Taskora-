import { useState, useCallback, useEffect, createContext} from 'react';
import '../../styles.scss';
import SideBar from './side-bar';
import TaskInfoWindow from './task-info-window';
import TaskList from './task-list';
import InizializateTasks, { FindTask, ChangeTask } from '../../scripts/dataTaskManager' 


export type TaskInfo = {
  id: number;
  title: string;
  description: string;
  time: string;
  completed: boolean;
};

type TaskPageType = {
    tasks: Array<TaskInfo> | undefined;
    currentTaskInfo: TaskInfo | undefined;
    changeCurrentTask: (title: string, description: string) => void
    updateList: () => void
}

export const TaskInfoContext = createContext<TaskPageType | undefined>(undefined);

function TaskPage() {
    const [tasks, setTasks] = useState<Array<TaskInfo> | undefined>()
    const [currentTaskInfo, setCurrentTaskInfo] = useState<TaskInfo | undefined>()

    const updateList = () => {
        if(tasks) 
            setTasks([...tasks])
    }

    const changeCurrentTask = (title: string, description: string) => {
        if(tasks != undefined) {
            const currentTaskIndex = tasks.findIndex(task => task.id === currentTaskInfo?.id)
            if(currentTaskIndex != undefined && currentTaskInfo != undefined) {

                //Изменяем значение tasks[currentTaskIndex], а потом обновляем сам tasks
                //Нужно для того чтобы своевременно обновился contextValue
                tasks[currentTaskIndex].title = title
                tasks[currentTaskIndex].description = description
                ChangeTask(currentTaskInfo.id, title, description, currentTaskInfo.time)
                updateList()
                setCurrentTaskInfo(tasks[currentTaskIndex])
            }
        }

    }

    //Передаем данные о задаче в фокусе
    const targetTask = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
        if(event.target instanceof HTMLElement) {
            if(event.target.classList.contains('task-list__task')) {
                FindTask(Number((event.target.id).split('-')[1])).then((data) => setCurrentTaskInfo(data))

            }
        }
    }, [])

    const contextValue = {
        tasks, 
        currentTaskInfo, 
        changeCurrentTask,
        updateList
    }

    //С пустым массивом зависимостей выполнится только при монтировании
    useEffect(() => {InizializateTasks().then((data) => {setTasks(data)})}, [])

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