import { useState, useEffect, createContext} from 'react';
import '../../styles.scss';
import SideBar from './side-bar';
import TaskInfoWindow from './task-info-window';
import TaskList from './task-list';
import InizializateTasks, { ChangeTask } from '../../scripts/dataTaskManager' 


export type TaskInfo = {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  priority: 'red' | 'blue' | 'green' | 'default';
};

type TaskPageType = {
    tasks: Array<TaskInfo> | undefined;
    currentTaskInfo: TaskInfo | undefined;
    setCurrentTask: (id: string) => void
    changeCurrentTask: (title: string, description: string, date: string, priority: 'red' | 'blue' | 'green' | 'default') => void
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

    const changeCurrentTask = (title: string, description: string, date: string, priority: 'red' | 'blue' | 'green' | 'default') => {
        if(tasks != undefined) {
            const currentTaskIndex = tasks.findIndex(task => task.id === currentTaskInfo?.id)
            if(currentTaskIndex != undefined && currentTaskInfo != undefined) {

                //Изменяем значение tasks[currentTaskIndex], а потом обновляем сам tasks
                //Нужно для того чтобы своевременно обновился contextValue
                tasks[currentTaskIndex].title = title
                tasks[currentTaskIndex].description = description
                tasks[currentTaskIndex].date = date
                tasks[currentTaskIndex].priority = priority
                ChangeTask(currentTaskInfo.id, title, description, date, priority)
                updateList()
                setCurrentTaskInfo(tasks[currentTaskIndex])
            }
        }

    }

    //Передаем данные о задаче в фокусе
    const setCurrentTask = (id: string) => {
        if(tasks) {
            const currentTaskIndex = tasks.findIndex(task => task.id === id)
            setCurrentTaskInfo(tasks[currentTaskIndex])
        }
    }

    const contextValue = {
        tasks, 
        currentTaskInfo,
        setCurrentTask, 
        changeCurrentTask,
        updateList
    }

    //С пустым массивом зависимостей выполнится только при монтировании
    useEffect(() => {InizializateTasks().then((data) => {setTasks(data)})}, [])

    return (
        <TaskInfoContext.Provider value={contextValue}>
            <div className='task-page' id='task-page'>
                <SideBar />
                <TaskList />
                <TaskInfoWindow />
            </div>    
        </TaskInfoContext.Provider>
    )
}

export default TaskPage;