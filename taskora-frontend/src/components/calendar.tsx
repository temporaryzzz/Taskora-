import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react";
import { useOnClickOutside } from "../hooks";

type CalendarProps = {
    date: string | null;
    timeSelectClass: string;
    setDate: (date: string | null) => void;
    toggleShowCalendar: () => void;
}

type DateButtonProps = {
	week: number;
    date: number;
    targetDate: string | null;
    fullDate: Date;
	changeCurrentMonth: (direction: '+' | '-') => void;
	setTargetDate: Dispatch<SetStateAction<string | null>>;
};

type RenderTimeButtonProps = {
    time: number[];
    currentTime: number[];
	setHours: Dispatch<SetStateAction<number>>;
	setMinutes: Dispatch<SetStateAction<number>>;
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

    const timeState = [
        [0, 0], [0, 30], [1, 0], [1, 30], [2, 0], [2, 30],
        [3, 0], [3, 30], [4, 0], [4, 30], [5, 0], [5, 30],
        [6, 0], [6, 30], [7, 0], [7, 30], [8, 0], [8, 30],
        [9, 0], [9, 30], [10, 0], [10, 30], [11, 0], [11, 30],
        [12, 0], [12, 30], [13, 0], [13, 30], [14, 0], [14, 30],
        [15, 0], [15, 30], [16, 0], [16, 30], [17, 0], [17, 30],
        [18, 0], [18, 30], [19, 0], [19, 30], [20, 0], [20, 30],
        [21, 0], [21, 30], [22, 0], [22, 30], [23, 0], [23, 30],
    ]

    const [renderDate, setRenderDate] = useState<Date>(props.date == null?new Date():new Date(props.date))
    const [deadlineDate, setDeadlineDate] = useState<string | null>(props.date)
    const [dates, setDates] = useState<number[]>([]);
    const [hours, setHours] = useState<number>(props.date == null?0:new Date(props.date).getHours());
    const [minutes, setMinutes] = useState<number>(props.date == null?59:new Date(props.date).getMinutes());
    const [classDropdownTitle, setClassDropdownTitle] = useState<string>('dropdown-menu__title')
    const [timeMessage, setTimeMessage] = useState<string>('Установите время')
    const dropdownItemsRef = useRef<HTMLUListElement>(null)
    const dropdownRef = useRef<HTMLDivElement>(null)

    const stateClasses = {
        dropdownItemsActive: 'dropdown-menu__items--active',
    }

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
        setRenderDate(prev => {
            const d = new Date(prev);
            if (direction === '+') d.setMonth(d.getMonth() + 1);
            else d.setMonth(d.getMonth() - 1);
            return d;
        })
    }

    const setDeadline = () => {
        if(deadlineDate !== null) {
            const newDate = new Date(new Date(deadlineDate))
            newDate.setHours(hours)
            newDate.setMinutes(minutes)
            newDate.setSeconds(0)
            props.setDate(newDate.toISOString())
        } 
        else if(deadlineDate == null && minutes !== 59) {
            const newDate = new Date()
            newDate.setHours(hours)
            newDate.setMinutes(minutes)
            newDate.setSeconds(0)
            props.setDate(newDate.toISOString())
            setDeadlineDate(newDate.toISOString())
        }
        props.toggleShowCalendar()
        clear()
    }

    const clear = () => {
        setRenderDate(new Date())
        setDeadlineDate(null)
        setHours(0)
        setMinutes(59)
    }

    useEffect(() => {
        InitializationTableDates()
    }, [renderDate])

    useEffect(() => {
        setRenderDate(props.date == null?new Date():new Date(props.date))
        setDeadlineDate(props.date)
        setMinutes(props.date == null?59:new Date(props.date).getMinutes())
        setHours(props.date == null?0:new Date(props.date).getHours())
    }, [props])

    useEffect(() => {
        if(minutes !== 59) {
            setClassDropdownTitle('dropdown-menu__title dropdown-menu__title--active')
            let messageMinutes = String(minutes)
            let messageHours = String(hours)
            if(minutes < 30) {
                messageMinutes = '0' + String(minutes)
            }
            if(hours < 10) {
                messageHours = '0' + String(hours)
            }
            setTimeMessage(messageHours + ':' + messageMinutes)
        }
        else {
            setClassDropdownTitle('dropdown-menu__title')
            setTimeMessage('Установите время')
        }
    }, [minutes, hours])

    useOnClickOutside(dropdownRef, () => {
        dropdownItemsRef.current?.classList.remove(stateClasses.dropdownItemsActive)
    })

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
                            key={`${renderDate.getFullYear()}-${renderDate.getMonth()}-1-${index}-${dateNum}`}/>
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
                        key={`${renderDate.getFullYear()}-${renderDate.getMonth()}-2-${index}-${dateNum}`}/>
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
                        key={`${renderDate.getFullYear()}-${renderDate.getMonth()}-3-${index}-${dateNum}`}/>
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
                        key={`${renderDate.getFullYear()}-${renderDate.getMonth()}-4-${index}-${dateNum}`}/>
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
                        key={`${renderDate.getFullYear()}-${renderDate.getMonth()}-5-${index}-${dateNum}`}/>
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
                        key={`${renderDate.getFullYear()}-${renderDate.getMonth()}-6-${index}-${dateNum}`}/>
                })}
            </ul>
            <div className="dropdown-menu" ref={dropdownRef}>
                <button className="calendar__time-menu dropdown-menu__button button" type="button" onClick={() => {
                    dropdownItemsRef.current?.classList.toggle(stateClasses.dropdownItemsActive)
                }}>
                    <div className={classDropdownTitle}>
                        <svg width="19" height="19" viewBox="0 0 19 19" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="9.14999" cy="9.14999" r="8.5" stroke="#929299" strokeWidth="1.3"/>
                            <rect x="8.58331" y="5.18333" width="1.13333" height="5.66667" rx="0.566667" fill="#929299"/>
                            <rect x="13.1167" y="9.71666" width="1.13333" height="4.53333" rx="0.566667" transform="rotate(90 13.1167 9.71666)" fill="#929299"/>
                        </svg>
                        <p>{timeMessage}</p>
                    </div>
                </button>
                <ul className={props.timeSelectClass} ref={dropdownItemsRef}>
                    {timeState.map((time, index) => {
                        return <RenderTimeButton time={time} currentTime={[hours, minutes]} setHours={setHours} setMinutes={setMinutes} key={index}/>
                    })}
                </ul>
            </div>
            <div className="calendar__container calendar__container--buttons">
                <button type="button" className="calendar__button button button--not-accent" onClick={() => {
                    clear(); 
                    props.setDate(null);
                }}>Очистить</button>
                <button type="button" className="calendar__button button button--inverse" onClick={setDeadline}>Ок</button>
            </div>
        </div>
    )
}



function DateButton(props: DateButtonProps) {
    const { date, week, fullDate, changeCurrentMonth, setTargetDate, targetDate } = props;
    const [dateButton, setDateButton] = useState<Date>()
    const today = new Date()
    const [classDateButton, setClassDateButton] = useState<string>('calendar__date')
    const stateClasses = {
        default: 'calendar__date',
        notIncluded: 'calendar__date calendar__date--not-included',
        today: 'calendar__date calendar__date--today',
        target: 'calendar__date calendar__date--target',
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
        let newDate: Date;
        if (week === 1 && date > 7) {
            newDate = new Date(fullDate.getFullYear(), fullDate.getMonth() - 1, date)
        } else if ((week === 5 && date < 23) || (week === 6 && date < 30)) {
            newDate = new Date(fullDate.getFullYear(), fullDate.getMonth() + 1, date)
        } else {
            newDate = new Date(fullDate.getFullYear(), fullDate.getMonth(), date)
        }

        setDateButton(newDate)

        let cls = stateClasses.default
        if (newDate.getFullYear() === today.getFullYear() && newDate.getMonth() === today.getMonth() && newDate.getDate() === today.getDate()) {
            cls = stateClasses.today
        } else if (newDate.getMonth() !== fullDate.getMonth()) {
            cls = stateClasses.notIncluded
        } else {
            cls = stateClasses.default
        }

        if (targetDate !== null) {
            const t = new Date(targetDate)
            if (t.getFullYear() === newDate.getFullYear() && t.getMonth() === newDate.getMonth() && t.getDate() === newDate.getDate()) {
                cls = stateClasses.target
            }
        }

        setClassDateButton(cls)
    }, [date, week, fullDate, targetDate])

    return(
        <li className={classDateButton} onClick={setDeadlineDate}>{props.date}</li>
    )
}

function RenderTimeButton(props: RenderTimeButtonProps) {

    const [classItem, setClassItem] = useState<string>('dropdown-menu__item')
    const [timeMessage, setTimeMessage] = useState<string>('')

    const InizializationTimeMessage = () => {
        let hours = String(props.time[0])
        let minutes = String(props.time[1])
        if(props.time[0] < 10) {
            hours = '0' + String(props.time[0])
        }
        if(props.time[1] !== 30) {
            minutes = '0' + String(props.time[1])
        }

        setTimeMessage(hours + ':' + minutes)
    }

    const setTime = () => {
        props.setHours(props.time[0])
        props.setMinutes(props.time[1])
    }

    useEffect(() => {
        if(props.currentTime[0] == props.time[0] && props.currentTime[1] == props.time[1]) {
            setClassItem('dropdown-menu__item dropdown-menu__item--active')
        }
        else {
            setClassItem('dropdown-menu__item')
        }
        InizializationTimeMessage()
    }, [props])

    return (
        <li className={classItem} onClick={setTime}>{timeMessage}</li>
    )
}