import { useContext } from 'react';
import '../../styles.scss';
import { TaskInfoContext } from "../task-manager/task-page";


function DateButton({date, elementClass, currentDate, targetDate} : {date: number, elementClass: string, currentDate: {year: number, month: number}, targetDate: Date | undefined}) {

    const taskManagerContext = useContext(TaskInfoContext)

    const ChangeDate = () => {
        if(taskManagerContext?.currentTaskInfo){
            const currentTaskInfo = taskManagerContext.currentTaskInfo
            const newDate = new Date(currentDate.year, currentDate.month, date, targetDate!=undefined?targetDate.getHours(): 23, targetDate!=undefined?targetDate.getMinutes(): 59)
            taskManagerContext?.changeCurrentTask(currentTaskInfo.title, currentTaskInfo.description, String(newDate), currentTaskInfo.priority)
        }
    }

    return(
        <li className={elementClass} id='calendar' onMouseDown={ChangeDate}>{date}</li>
    )
}

export default DateButton