import { useEffect, useState, useContext} from 'react';
import '../../styles.scss';
import { TaskInfoContext } from "../../App";
import Calendar from '../calendar/calendar';

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
        <div className='task-info-window' style={{visibility: `${currentTaskInfo == undefined?'hidden':'visible'}`}}>
            <textarea className='task-info-window__title' 
                value={taskTitle}
                onChange={(e) => {
                    setTaskTitle(e.target.value)
                    changeCurrentTask(e.target.value, taskDescription??'', currentTaskInfo?.due_date??'', currentTaskInfo?.priority??'DEFAULT', currentTaskInfo?.completed??false)
                }}> 
            </textarea>

            <textarea className='task-info-window__description' 
                value={taskDescription}
                placeholder='Добавьте описание...'
                                onChange={(e) => {
                    setTaskDescription(e.target.value)
                    changeCurrentTask(taskTitle??'', e.target.value, currentTaskInfo?.due_date??'', currentTaskInfo?.priority??'DEFAULT', currentTaskInfo?.completed??false)
                }}>
            </textarea>
            
            <Calendar />
        </div>    
    )
}

export default TaskInfoWindow;