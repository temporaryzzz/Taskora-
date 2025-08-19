import { useState, useEffect, createContext} from 'react';
import '../../styles.scss';
import SideBar from './side-bar';
import TaskInfoWindow from './task-info-window';
import TaskList from './task-list';
import ContextMenu from '../contextMenu';
import InizializateTasks, { ChangeTask } from '../../scripts/dataTaskManager' 


export type TaskInfo = {
  id: string;
  title: string;
  description: string;
  date: string;
  completed: boolean;
  priority: 'highest' | 'high' | 'middle' | 'default';
};

type TaskPageType = {
    tasks: Array<TaskInfo> | undefined;
    currentTaskInfo: TaskInfo | undefined;
    setCurrentTask: (id: string) => void
    changeCurrentTask: (title: string, description: string, date: string, priority: 'highest' | 'high' | 'middle' | 'default') => void
    updateList: () => void
}

export const TaskInfoContext = createContext<TaskPageType | undefined>(undefined);


function TaskPage() {
    const [tasks, setTasks] = useState<Array<TaskInfo> | undefined>()
    const [currentTaskInfo, setCurrentTaskInfo] = useState<TaskInfo | undefined>()
    const [contextMenuActive, setContextMenuActive] = useState(false)
    const [mouseX, setMouseX] = useState<number>(0)
    const [mouseY, setMouseY] = useState<number>(0)


    const updateList = () => {
        if(tasks) 
            setTasks([...tasks])
    }

    const changeCurrentTask = (title: string, description: string, date: string, priority: 'highest' | 'high' | 'middle' | 'default') => {
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

    const OnContextMenu = (event: React.MouseEvent) => {
        //(event.target as Element) - ну это ахуй))))))))))))
        if((event.target as Element).classList.contains('task-list__task') || (event.target as Element).id == 'task') {
            event.preventDefault()
            const taskListElement = document.querySelector('.task-list')
        
            if(taskListElement) {
                const {top} = taskListElement.getBoundingClientRect()
                setMouseX(event.clientX) 
                if(window.innerHeight - event.clientY > 370) {
                    setMouseY(event.clientY - (top - taskListElement.clientTop))//Считаем от начала taskListElement(потому что task-page не включает в себя шапку)
                }
                else {
                    setMouseY(event.clientY - (top - taskListElement.clientTop) - 370)
                }
                setContextMenuActive(!contextMenuActive)
            }
        } 

        else {
            return
        }
    }

    const setPriority = (priority: 'highest' | 'high' | 'middle' | 'default') => {
        if(currentTaskInfo) {
            changeCurrentTask(currentTaskInfo.title, currentTaskInfo.description, currentTaskInfo.date, priority)
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
    useEffect(() => {
        document.addEventListener('mouseup', () => { setContextMenuActive(false) })
        //Бля, я тебя умоляю, не забывай удалять слушатели
        return () => document.removeEventListener('mouseup', () => { setContextMenuActive(false) })
    }, [])

    return (
        <TaskInfoContext.Provider value={contextValue}>
            <div className='task-page' id='task-page' onContextMenu={event => OnContextMenu(event)}>
                <ContextMenu setColorPriority={setPriority} active={contextMenuActive} x={mouseX} y={mouseY}/> 
                <SideBar />
                <TaskList />
                <TaskInfoWindow />
            </div>    
        </TaskInfoContext.Provider>
    )
}

export default TaskPage;