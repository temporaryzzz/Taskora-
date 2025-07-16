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

    //Обновление данных
    useEffect(() => {
        setTaskTitle(currentTaskInfo?.title)
        setTaskDescription(currentTaskInfo?.description)
    }, [currentTaskInfo])

    return (
        <div className='task-info-winow' style={{visibility: `${currentTaskInfo == undefined?'hidden':'visible'}`}}>
            <textarea className='task-info-winow task-info-winow__title' 
                value={taskTitle}
                onChange={(e) => {
                    setTaskTitle(e.target.value)
                    changeCurrentTask(e.target.value, taskDescription??'')
                }}> 
            </textarea>

            <textarea className='task-info-winow task-info-winow__description' 
                value={taskDescription}
                placeholder='Добавьте описание...'
                                onChange={(e) => {
                    setTaskDescription(e.target.value)
                    changeCurrentTask(taskTitle??'', e.target.value)
                }}>
            </textarea>
        </div>    
    )
}

export default TaskInfoWindow;