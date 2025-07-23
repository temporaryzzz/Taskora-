import { useEffect, useState, useContext } from 'react';
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

    //Обновление данных
    useEffect(() => {
        setTaskTitle(currentTaskInfo?.title)
        setTaskDescription(currentTaskInfo?.description)
        setTaskTime(currentTaskInfo?.time)
    }, [currentTaskInfo])

    return (
        <div className='task-info-window' style={{visibility: `${currentTaskInfo == undefined?'hidden':'visible'}`}}>
            <textarea className='task-info-window task-info-window__title' 
                value={taskTitle}
                onChange={(e) => {
                    setTaskTitle(e.target.value)
                    changeCurrentTask(e.target.value, taskDescription??'', taskTime??'')
                }}> 
            </textarea>

            <textarea className='task-info-window task-info-window__description' 
                value={taskDescription}
                placeholder='Добавьте описание...'
                                onChange={(e) => {
                    setTaskDescription(e.target.value)
                    changeCurrentTask(taskTitle??'', e.target.value, taskTime??'')
                }}>
            </textarea>

            <span className='task-info-window task-info-window__date'>
                <p>четверг, 24 июля, {taskTime}</p>
            </span>
        </div>    
    )
}

export default TaskInfoWindow;