import { type SetStateAction } from 'react';
import '../../styles.scss';
//import { TaskInfoContext } from "../task-manager/task-page";


function DateButton({date, elementClass, currentDate, targetDate, setTargetDate, ChangeCurrentMonth, direction} : 
    {date: number, elementClass: string, currentDate: {year: number, month: number}, targetDate: Date | undefined, 
    setTargetDate: React.Dispatch<SetStateAction<Date | undefined>>, ChangeCurrentMonth: (direction: '+' | '-') => void, direction: '+' | '-' | '0'}) {

    const ChangeDate = () => {
        const newDate = new Date(currentDate.year, currentDate.month, date, targetDate!=undefined?targetDate.getHours(): 23, targetDate!=undefined?targetDate.getMinutes(): 59)
        if(direction != '0') {
            ChangeCurrentMonth(direction)
        }
        setTargetDate(newDate)
    }

    return(
        <li className={elementClass} id='calendar' onMouseDown={ChangeDate}>{date}</li>
    )
}

export default DateButton