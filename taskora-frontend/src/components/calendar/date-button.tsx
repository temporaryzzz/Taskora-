import { useContext } from 'react';
import '../../styles.scss';
import { TaskInfoContext } from "../task-manager/task-page";


function DateButton({date, elementClass, currentDate} : {date: number, elementClass: string, currentDate: {year: number, month: number}}) {

    const taskManagerContext = useContext(TaskInfoContext)

    const ChangeDate = () => {
        if(taskManagerContext?.currentTaskInfo){
            const currentTaskInfo = taskManagerContext.currentTaskInfo
            const hours = new Date(taskManagerContext.currentTaskInfo.date).getHours()
            const minutes = new Date(taskManagerContext.currentTaskInfo.date).getMinutes()
            const newDate = new Date(currentDate.year, currentDate.month, date, hours, minutes)
            taskManagerContext?.changeCurrentTask(currentTaskInfo.title, currentTaskInfo.description, String(newDate), currentTaskInfo.priority)
        }
    }

    return(
        <li className={elementClass} id='calendar' onMouseDown={ChangeDate}>{date}</li>
    )
}

export default DateButton