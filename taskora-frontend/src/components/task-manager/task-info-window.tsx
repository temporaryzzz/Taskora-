import { useEffect, useState, useContext} from 'react';
import '../../styles.scss';
import { TaskInfoContext } from "./task-page";
import Calendar from '../calendar';

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
            <textarea className='task-info-window__title' 
                value={taskTitle}
                onChange={(e) => {
                    setTaskTitle(e.target.value)
                    changeCurrentTask(e.target.value, taskDescription??'', taskTime??'', currentTaskInfo?.priority??'default')
                }}> 
            </textarea>

            <textarea className='task-info-window__description' 
                value={taskDescription}
                placeholder='Добавьте описание...'
                                onChange={(e) => {
                    setTaskDescription(e.target.value)
                    changeCurrentTask(taskTitle??'', e.target.value, taskTime??'', currentTaskInfo?.priority??'default')
                }}>
            </textarea>
            
            <Calendar />
        </div>    
    )
}

export default TaskInfoWindow;