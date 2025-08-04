import { useContext } from 'react';
import '../../styles.scss';
import { TaskInfoContext } from "../task-manager/task-page";


function DateButton({date, elementClass, currentDate} : {date: number, elementClass: string, currentDate: {year: number, month: number}}) {

    const taskManagerContext = useContext(TaskInfoContext)

    const ChangeDate = () => {
        if(taskManagerContext?.currentTaskInfo){
            const currentTaskInfo = taskManagerContext.currentTaskInfo
            const newDate = new Date(currentDate.year, currentDate.month, date)
            taskManagerContext?.changeCurrentTask(currentTaskInfo.title, currentTaskInfo.description, String(newDate) ,currentTaskInfo.time, currentTaskInfo.priority)
        }
    }

    return(
        <li className={elementClass} id='calendar' onMouseDown={() => ChangeDate()}>{date}</li>
    )
}

export default DateButton