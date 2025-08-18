import { type SetStateAction } from 'react';
import '../../styles.scss';
//import { TaskInfoContext } from "../task-manager/task-page";


function DateButton({date, elementClass, currentDate, targetDate, setTargetDate} : {date: number, elementClass: string, currentDate: {year: number, month: number}, targetDate: Date | undefined, setTargetDate: React.Dispatch<SetStateAction<Date | undefined>>}) {

    const ChangeDate = () => {
        const newDate = new Date(currentDate.year, currentDate.month, date, targetDate!=undefined?targetDate.getHours(): 23, targetDate!=undefined?targetDate.getMinutes(): 59)
        setTargetDate(newDate)
    }

    return(
        <li className={elementClass} id='calendar' onMouseDown={ChangeDate}>{date}</li>
    )
}

export default DateButton