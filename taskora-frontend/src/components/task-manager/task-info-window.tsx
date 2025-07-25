import { useEffect, useState, useContext, useRef } from 'react';
import '../../styles.scss';
import { TaskInfoContext } from "./task-page";

function TaskInfoWindow() {
    const taskInfo = useContext(TaskInfoContext)

    if(!taskInfo) {
        return null
    }

    const {currentTaskInfo, changeCurrentTask} = taskInfo
    const [taskTitle, setTaskTitle] = useState<string | undefined>(currentTaskInfo?.title)
    const [taskDescription, setTaskDescription] = useState<string | undefined>(currentTaskInfo?.description)
    const [taskTime, setTaskTime] = useState<string | undefined>(currentTaskInfo?.time)
    const dateMenuRef = useRef<HTMLDivElement>(null)

    //Обновление данных
    useEffect(() => {
        setTaskTitle(currentTaskInfo?.title)
        setTaskDescription(currentTaskInfo?.description)
        setTaskTime(currentTaskInfo?.time)
    }, [currentTaskInfo])

    const changeVisibleDateMenu = () => {
        if(dateMenuRef.current) {
            if(dateMenuRef.current.style.display == 'none') {
                dateMenuRef.current.style.display = 'block'
            }

            else {
                dateMenuRef.current.style.display = 'none'
            }
        }
    }

    return (
        <div className='task-info-window' style={{visibility: `${currentTaskInfo == undefined?'hidden':'visible'}`}}>
            <textarea className='task-info-window__title' 
                value={taskTitle}
                onChange={(e) => {
                    setTaskTitle(e.target.value)
                    changeCurrentTask(e.target.value, taskDescription??'', taskTime??'')
                }}> 
            </textarea>

            <textarea className='task-info-window__description' 
                value={taskDescription}
                placeholder='Добавьте описание...'
                                onChange={(e) => {
                    setTaskDescription(e.target.value)
                    changeCurrentTask(taskTitle??'', e.target.value, taskTime??'')
                }}>
            </textarea>
            
            <div className='task-info-window__menu-date' style={{display: 'none'}} ref={dateMenuRef}>
                <input type='time'></input>
                <input type='date'></input>
            </div>

            <button 
                className='task-info-window__date'
                onFocus={() => {changeVisibleDateMenu()}}
                onBlur={() => {changeVisibleDateMenu()}}>
                <p>четверг, 24 июля, {taskTime}</p>
            </button>
        </div>    
    )
}

export default TaskInfoWindow;