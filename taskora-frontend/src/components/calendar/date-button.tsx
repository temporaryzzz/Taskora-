import { type SetStateAction } from 'react';
import '../../styles.scss';
//import { TaskInfoContext } from "../task-manager/task-page";

type DateButtonProps = {
    date: number;
    elementClass: string;
    currentDate: {year: number, month: number};
    targetDate: Date | undefined;
    setTargetDate: React.Dispatch<SetStateAction<Date | undefined>>;
    ChangeCurrentMonth: (direction: '+' | '-') => void;
    direction: '+' | '-' | '0';
}


function DateButton(props: DateButtonProps) {

    const ChangeDate = () => {
        const newDate = new Date(props.currentDate.year, props.currentDate.month, props.date, 
            props.targetDate!=undefined?props.targetDate.getHours(): 23, props.targetDate!=undefined?props.targetDate.getMinutes(): 59)
            
        if(props.direction != '0') {
            props.ChangeCurrentMonth(props.direction)
        }
        props.setTargetDate(newDate)
    }

    return(
        <li className={props.elementClass} id='calendar' onMouseDown={ChangeDate}>{props.date}</li>
    )
}

export default DateButton