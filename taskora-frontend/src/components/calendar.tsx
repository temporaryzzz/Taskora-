import { useEffect, useState, type Dispatch, type SetStateAction } from "react";

type CalendarProps = {
    date: string | null;
    setDate: (date: string | null) => void;
}

type DateButtonProps = {
	week: number;
    date: number;
    targetDate: string | null;
    fullDate: Date;
	changeCurrentMonth: (direction: '+' | '-') => void;
	setTargetDate: Dispatch<SetStateAction<string | null>>;
};

export function Calendar(props: CalendarProps) {

	const monthState = [
		'января',
		'февраля',
		'марта',
		'апреля',
		'мая',
		'июня',
		'июля',
		'августа',
		'сентября',
		'октября',
		'ноября',
		'декабря',
		'Январь',
		'Февраль',
		'Март',
		'Апрель',
		'Май',
		'Июнь',
		'Июль',
		'Август',
		'Сентябрь',
		'Октябрь',
		'Ноябрь',
		'Декабрь',
	];

    const [renderDate, setRenderDate] = useState<Date>(props.date == null?new Date():new Date(props.date))
    const [deadlineDate, setDeadlineDate] = useState<string | null>(props.date)
    const [dates, setDates] = useState<number[]>([]);

    const InitializationTableDates = () => {
		const newDates = [];
        const firstDay = new Date(renderDate.getFullYear(), renderDate.getMonth(), 1).getDay()
		for (let i = 1; i < 43; i++) {
			//6 строк по 7 дней
			if (firstDay == 0) {
				newDates.push(new Date(renderDate.getFullYear(), renderDate.getMonth(), i - 6).getDate());
			} else {
				newDates.push(
					new Date(renderDate.getFullYear(), renderDate.getMonth(), i + 1 - firstDay).getDate()
				);
			}
		}
		setDates(newDates);
	};

    const changeCurrentMonth = (direction: '+' | '-') => {
        if (direction == '+') {
            setRenderDate(new Date(renderDate.setMonth(renderDate.getMonth() + 1)))
		} else {
            setRenderDate(new Date(renderDate.setMonth(renderDate.getMonth() - 1)))
		}
    }

    useEffect(() => {
        InitializationTableDates()
    }, [renderDate])

    useEffect(() => {
        setRenderDate(props.date == null?new Date():new Date(props.date))
    }, [props])

    return (
        <div className="calendar" onClick={(e) => e.stopPropagation()}>
            <div className="calendar__container">
                <button type="button" className="button button--prev" onClick={() => changeCurrentMonth('-')}></button>
                <p className="calendar__title">{monthState[renderDate.getMonth() + 12] + ' ' + renderDate.getFullYear()}</p>
                <button type="button" className="button button--next" onClick={() => changeCurrentMonth('+')}></button>
            </div>
            <ul className="calendar__container">
                <li className="calendar__day">ПН.</li>
                <li className="calendar__day">ВТ.</li>
                <li className="calendar__day">СР.</li>
                <li className="calendar__day">ЧТ.</li>
                <li className="calendar__day">ПТ.</li>
                <li className="calendar__day">СБ.</li>
                <li className="calendar__day">ВС.</li>
            </ul>
            <ul className="calendar__container" id="week-1">
                {dates.slice(0, 7).map((dateNum, index) => {
                    return <DateButton 
                        date={dateNum} 
                        week={1} 
                        fullDate={renderDate} 
                        changeCurrentMonth={changeCurrentMonth} 
                        setTargetDate={setDeadlineDate} 
                        targetDate={deadlineDate}
                        key={index}/>
                })}
            </ul>
            <ul className="calendar__container" id="week-2">
                {dates.slice(7, 14).map((dateNum, index) => {
                    return <DateButton 
                        date={dateNum} 
                        week={2} 
                        fullDate={renderDate} 
                        changeCurrentMonth={changeCurrentMonth} 
                        setTargetDate={setDeadlineDate} 
                        targetDate={deadlineDate}
                        key={index}/>
                })}
            </ul>
            <ul className="calendar__container" id="week-3">
                {dates.slice(14, 21).map((dateNum, index) => {
                    return <DateButton 
                        date={dateNum} 
                        week={3} 
                        fullDate={renderDate} 
                        changeCurrentMonth={changeCurrentMonth} 
                        setTargetDate={setDeadlineDate}  
                        targetDate={deadlineDate}
                        key={index}/>
                })}
            </ul>
            <ul className="calendar__container" id="week-4">
                {dates.slice(21, 28).map((dateNum, index) => {
                    return <DateButton 
                        date={dateNum} 
                        week={4} 
                        fullDate={renderDate} 
                        changeCurrentMonth={changeCurrentMonth} 
                        setTargetDate={setDeadlineDate}  
                        targetDate={deadlineDate}
                        key={index}/>
                })}
            </ul>
            <ul className="calendar__container" id="week-5">
                {dates.slice(28, 35).map((dateNum, index) => {
                    return <DateButton 
                        date={dateNum} 
                        week={5} 
                        fullDate={renderDate} 
                        changeCurrentMonth={changeCurrentMonth} 
                        setTargetDate={setDeadlineDate}  
                        targetDate={deadlineDate}
                        key={index}/>
                })}
            </ul>
            <ul className="calendar__container" id="week-6">
                {dates.slice(35, 42).map((dateNum, index) => {
                    return <DateButton 
                        date={dateNum} 
                        week={6} 
                        fullDate={renderDate} 
                        changeCurrentMonth={changeCurrentMonth} 
                        setTargetDate={setDeadlineDate}  
                        targetDate={deadlineDate}
                        key={index}/>
                })}
            </ul>
            <div className="calendar__container calendar__container--buttons">
                <button type="button" className="calendar__button button button--not-accent" onClick={() => {
                    setRenderDate(new Date())
                    props.setDate(null)
                    }}>Очистить</button>
                <button type="button" className="calendar__button button button--inverse" onClick={() => {props.setDate(deadlineDate)}}>Ок</button>
            </div>
        </div>
    )
}



function DateButton(props: DateButtonProps) {
	const { date, week, fullDate, changeCurrentMonth, setTargetDate } = props;
    const [dateButton, setDateButton] = useState<Date>()
    const [today] = useState<Date>(new Date())
    const [classDateButton, setClassDateButton] = useState<string>('calendar__date')
    const stateClasses = {
        default: 'calendar__date',
        notIncluded: 'calendar__date calendar__date--not-included',
        today: 'calendar__date calendar__date--today',
        target: 'calendar__date calendar__date--target',
    }

    const InitializationDate = () => {
        switch(week) {
            case 1: {
                if(date > 7) {
                    let newDate = new Date(fullDate)
                    newDate = new Date(newDate.setMonth(newDate.getMonth() - 1))
                    newDate = new Date(newDate.getFullYear(), newDate.getMonth(), date)
                    setDateButton(newDate)

                    if(newDate.getFullYear() == today.getFullYear() 
                        && newDate.getMonth() == today.getMonth()
                        && newDate.getDate() == today.getDate()) {
                        setClassDateButton(stateClasses.today)
                    }
                    else {
                        setClassDateButton(stateClasses.notIncluded)
                    }
                }
                else {
                    let newDate = new Date(fullDate.getFullYear(), fullDate.getMonth(), date)
                    setDateButton(newDate)

                    if(newDate.getFullYear() == today.getFullYear() 
                        && newDate.getMonth() == today.getMonth()
                        && newDate.getDate() == today.getDate()) {
                        setClassDateButton(stateClasses.today)
                    }
                    else {
                        setClassDateButton(stateClasses.default)
                    }
                }
                break
            }
            case 5: {
                if(date < 23) {
                    let newDate = new Date(fullDate)
                    newDate = new Date(newDate.setMonth(newDate.getMonth() + 1))
                    newDate = new Date(newDate.getFullYear(), newDate.getMonth(), date)
                    setDateButton(newDate)

                    if(newDate.getFullYear() == today.getFullYear() 
                        && newDate.getMonth() == today.getMonth()
                        && newDate.getDate() == today.getDate()) {
                        setClassDateButton(stateClasses.today)
                    }
                    else {
                        setClassDateButton(stateClasses.notIncluded)
                    }
                }
                else {
                    let newDate = new Date(fullDate.getFullYear(), fullDate.getMonth(), date)
                    setDateButton(newDate)

                    if(newDate.getFullYear() == today.getFullYear() 
                        && newDate.getMonth() == today.getMonth()
                        && newDate.getDate() == today.getDate()) {
                        setClassDateButton(stateClasses.today)
                    }
                    else {
                        setClassDateButton(stateClasses.default)
                    }
                }
                break
            }
            case 6: {
                if(date < 30) {
                    let newDate = new Date(fullDate)
                    newDate = new Date(newDate.setMonth(newDate.getMonth() + 1))
                    newDate = new Date(newDate.getFullYear(), newDate.getMonth(), date)
                    setDateButton(newDate)

                    if(newDate.getFullYear() == today.getFullYear() 
                        && newDate.getMonth() == today.getMonth()
                        && newDate.getDate() == today.getDate()) {
                        setClassDateButton(stateClasses.today)
                    }
                    else {
                        setClassDateButton(stateClasses.notIncluded)
                    }
                }
                else {
                    let newDate = new Date(fullDate.getFullYear(), fullDate.getMonth(), date)
                    setDateButton(newDate)

                    if(newDate.getFullYear() == today.getFullYear() 
                        && newDate.getMonth() == today.getMonth()
                        && newDate.getDate() == today.getDate()) {
                        setClassDateButton(stateClasses.today)
                    }
                    else {
                        setClassDateButton(stateClasses.default)
                    }
                }
                break
            }
            default: {
                let newDate = new Date(fullDate.getFullYear(), fullDate.getMonth(), date)
                setDateButton(newDate)

                if(newDate.getFullYear() == today.getFullYear() 
                    && newDate.getMonth() == today.getMonth()
                    && newDate.getDate() == today.getDate()) {
                    setClassDateButton(stateClasses.today)
                }
                else {
                    setClassDateButton(stateClasses.default)
                }
            }
        }
    }

    const setDeadlineDate = () => {
        if(dateButton && dateButton.getMonth() < fullDate.getMonth()) {
            if(fullDate.getMonth() == 11 && dateButton.getMonth() == 0) {
                changeCurrentMonth('+')
            }
            else {
                changeCurrentMonth('-')
            }
        }
        else if(dateButton && dateButton.getMonth() > fullDate.getMonth()) {
            if(fullDate.getMonth() == 0 && dateButton.getMonth() == 11) {
                changeCurrentMonth('-')
            }
            else {
                changeCurrentMonth('+')
            }
        }
        if(dateButton) {
            setTargetDate(dateButton.toISOString())
        }
    }

    useEffect(() => {
        InitializationDate()
        if(props.targetDate !== null && new Date(props.targetDate).getFullYear() == dateButton?.getFullYear()
            && new Date(props.targetDate).getMonth() == dateButton?.getMonth()
            && new Date(props.targetDate).getDate() == dateButton?.getDate()) {
            setClassDateButton(stateClasses.target)
        }
    },[props])

    return(
        <li className={classDateButton} onClick={setDeadlineDate}>{props.date}</li>
    )
}