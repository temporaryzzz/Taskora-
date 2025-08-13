import '../../styles.scss';
import { useContext, useEffect, useRef, useState } from "react";
import { TaskInfoContext} from "../task-manager/task-page";
import DateButton from './date-button';

const RenderDate = ({dates, week, currentDate, targetDate}: {dates: number[], week: number, currentDate: {year: number, month: number}, targetDate: Date | undefined}) => {

    const [todayDate] = useState(new Date())

    return(
        dates.map(date => {
            //Если в первой строке число больше 7-ми, то это день из предыдущего месяца
            if(week == 1 && date > 7) {
                if(date == todayDate.getDate() && currentDate.month == todayDate.getMonth() + 1 && currentDate.year == todayDate.getFullYear()) {
                    return <DateButton date={date} elementClass={'calendar-wrapper__date calendar-wrapper__date--today'} currentDate={currentDate} key={date}/>
                }
                else{
                    return <DateButton date={date} elementClass={'calendar-wrapper__date calendar-wrapper__date--not-included'} currentDate={currentDate} key={date}/>
                }
            }

            if(week == 5 && date < 23) {
                if(date == todayDate.getDate() && currentDate.month == todayDate.getMonth() - 1 && currentDate.year == todayDate.getFullYear()) {
                    return <DateButton date={date} elementClass={'calendar-wrapper__date calendar-wrapper__date--today'} currentDate={currentDate} key={date}/>
                }
                else{
                    return <DateButton date={date} elementClass={'calendar-wrapper__date calendar-wrapper__date--not-included'} currentDate={currentDate} key={date}/>
                }
            }

            if(week == 6 && date < 30) {
                if(date == todayDate.getDate() && currentDate.month == todayDate.getMonth() - 1 && currentDate.year == todayDate.getFullYear()) {
                    return <DateButton date={date} elementClass={'calendar-wrapper__date calendar-wrapper__date--today'} currentDate={currentDate} key={date}/>
                }
                else{
                    return <DateButton date={date} elementClass={'calendar-wrapper__date calendar-wrapper__date--not-included'} currentDate={currentDate} key={date}/>
                }
            }

            if(date == targetDate?.getDate() && currentDate.year == targetDate?.getFullYear() && currentDate.month == targetDate?.getMonth()) {
                return <DateButton date={date} elementClass={'calendar-wrapper__date calendar-wrapper__date--target'} currentDate={currentDate} key={date}/>
            }

            else {
                if(date == todayDate.getDate() && currentDate.month == todayDate.getMonth() && currentDate.year == todayDate.getFullYear()) {
                    return <DateButton date={date} elementClass={'calendar-wrapper__date calendar-wrapper__date--today'} currentDate={currentDate} key={date}/>
                }
                else{
                    return <DateButton date={date} elementClass={'calendar-wrapper__date'} currentDate={currentDate} key={date}/>
                }
            }
        })
    )
}

const RenderTimeBtn = ({ChangeTime, currentTime} : {ChangeTime(time : string) : void, currentTime : string | undefined}) => {
    
    const preliminaryTime = ['00:00', '00:30', '01:00', '01:30', '02:00', '02:30', '03:00', '03:30', '04:00', '04:30', '05:00', '05:30',
        '06:00', '06:30', '07:00', '07:30', '08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
        '13:00', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30',
        '20:00', '20:30', '21:00', '21:30', '22:00', '22:30', '23:00', '23:30'
    ]

    return (
        preliminaryTime.map(time => {
            if(currentTime !== time) {
                return <button onClick={() => ChangeTime(time)} className="dropdown-menu__option-btn" id="calendar" key={time}>{time}</button>
            }
            else {
                return <button onClick={() => ChangeTime(time)} className="dropdown-menu__option-btn dropdown-menu__option-btn--current" id="calendar" key={time}>{time}</button>
            }
        })
    )
}

function Calendar () {

    const daysState = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота']
    const monthState = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 
        'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря', 'Январь',
        'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь',
        'Октябрь', 'Ноябрь', 'Декабрь']

    const taskInfo = useContext(TaskInfoContext)
    const taskDate = taskInfo?.currentTaskInfo?.date
    const taskTime = taskInfo?.currentTaskInfo?.time

    const [date, setDate] = useState(new Date())
    const [targetDate, setTargetDate] = useState<Date | undefined>()
    const [currentMonth, setCurrentMonth] = useState(date.getMonth())
    const [currentYear, setCurrentYear] = useState(date.getFullYear())
    const [firstDayCurrentMonth, setFirstDayCurrentMonth] = useState((new Date(currentYear, currentMonth, 1)).getDay())
    const [dateButtonValue, setDateButtonValue] = useState('Установите дату')
    const [dates, setDates] = useState<number[]>([])
    const [time, setTime] = useState(taskTime)
    const calendarRef = useRef<HTMLDivElement>(null)
    const dropdownMenuRef = useRef<HTMLDivElement>(null)
    const dropdownMenuContentRef = useRef<HTMLDivElement>(null)

    const InizializateDates = () => {
        const newDates = []
        for(let i = 0; i < 42; i++) {
            if(firstDayCurrentMonth == 0) {
                newDates.push(new Date(currentYear, currentMonth, (i + 2) - 7).getDate())
            }

            else {
                newDates.push(new Date(currentYear, currentMonth, (i + 2) - firstDayCurrentMonth).getDate())
            }
        }
        setDates(newDates)
    }

    const ChangeCurrentMonth = (direction: '+' | '-') => {
        if(direction == '+') {
            if(currentMonth !== 11) {
                setCurrentMonth(currentMonth + 1)
            }
            else{
                setCurrentMonth(0)
                setCurrentYear(currentYear + 1)
            }
        }
        else {
            if(currentMonth !== 0) {
                setCurrentMonth(currentMonth - 1)

            }
            else{
                setCurrentMonth(11)
                setCurrentYear(currentYear - 1)
            }
        }
    }

    const ChangeStateCalendar = () => {
        if(calendarRef.current) {
            if(calendarRef.current.style.display == 'none') {
                calendarRef.current.style.display = 'flex'
            }

            else {
                calendarRef.current.style.display = 'none'
            }
        }
    }

    const ChangeVisibleDropdownMenu = () => {
        if(dropdownMenuContentRef.current && dropdownMenuRef.current) {
            if(dropdownMenuContentRef.current.style.display == 'none') {
                dropdownMenuContentRef.current.style.display = 'flex'
                dropdownMenuRef.current.classList.add('dropdown-menu--active')
            }

            else {
                dropdownMenuContentRef.current.style.display = 'none'
                if(dropdownMenuRef.current.classList.contains('dropdown-menu--active')) {
                    dropdownMenuRef.current.classList.remove('dropdown-menu--active')
                }
            }
        }
    }

    const ChangeTime = (time: string) => {
        setTime(time)
        if(taskInfo?.currentTaskInfo) {
            taskInfo.changeCurrentTask(taskInfo.currentTaskInfo.title, taskInfo.currentTaskInfo.description,
                taskDate, time, taskInfo.currentTaskInfo.priority)
        }
    }

    document.addEventListener('mousedown', (e) => { 
        if(e.target instanceof HTMLElement) {
            if(e.target.id !== 'calendar' && !e.target.classList.contains('task-info-window__date')){
                if(calendarRef.current)  {
                    calendarRef.current.style.display = 'none'
                }

                if(dropdownMenuContentRef.current) {
                    dropdownMenuContentRef.current.style.display = 'none'
                }

                if(dropdownMenuRef.current) {
                    if(dropdownMenuRef.current.classList.contains('dropdown-menu--active')) {
                        dropdownMenuRef.current.classList.remove('dropdown-menu--active')
                    }
                }
            }
        }
    })

    useEffect(() => setFirstDayCurrentMonth((new Date(currentYear, currentMonth, 1)).getDay()), [currentMonth])
    useEffect(() => InizializateDates(), [firstDayCurrentMonth, currentMonth])
    useEffect(() => {setDate(new Date(taskDate??date))}, [taskDate])
    useEffect(() => {
        if(taskTime == '') {
            setTime('Срок исполнения')
        }
        else {
            setTime(taskTime)
        }
    }, [taskTime])
    useEffect(() => {
        if(taskDate != undefined) {
            setDateButtonValue(daysState[date.getDay()] + ', ' + date.getDate() + ' ' + monthState[date.getMonth()] + ' ' + date.getFullYear())
            setTargetDate(date)
            setCurrentMonth(date.getMonth())
            setCurrentYear(date.getFullYear())
        }
        else {
            //Если дата не задана
            setTargetDate(undefined)
            setDateButtonValue('Установите дату')
        }
    }, [date])

    return(
        <div>
            <div className='calendar-wrapper' id='calendar' style={{display: 'none'}} ref={calendarRef}>
                <div className='calendar-wrapper__header' id='calendar'>
                    <button className='calendar-wrapper__month-button' id='calendar' 
                        onClick={() => ChangeCurrentMonth('-')}>
                    </button>
                    <div className='calendar-wrapper__month' id='calendar'>
                        <p>{monthState[currentMonth + 12]} {currentYear}</p>
                    </div>
                    <button className='calendar-wrapper__month-button' id='calendar' 
                        onClick={() => ChangeCurrentMonth('+')}>
                    </button>
                </div>

                <ul className='calendar-wrapper__container' id='calendar'>
                    <li className='calendar-wrapper__day' id='calendar'>Пн</li>
                    <li className='calendar-wrapper__day' id='calendar'>Вт</li>
                    <li className='calendar-wrapper__day' id='calendar'>Ср</li>
                    <li className='calendar-wrapper__day' id='calendar'>Чт</li>
                    <li className='calendar-wrapper__day' id='calendar'>Пт</li>
                    <li className='calendar-wrapper__day' id='calendar'>Сб</li>
                    <li className='calendar-wrapper__day' id='calendar'>Вс</li>
                </ul>

                <ul className='calendar-wrapper__container calendar-wrapper__container--weeks' id='calendar'>
                    <ul className='calendar-wrapper__container' id='calendar'>
                       <RenderDate dates={dates.slice(0, 7)} week={1} currentDate={{year:currentYear,month:currentMonth}} targetDate={targetDate}/>
                    </ul>

                    <ul className='calendar-wrapper__container' id='calendar'>
                       <RenderDate dates={dates.slice(7, 14)} week={2} currentDate={{year:currentYear,month:currentMonth}} targetDate={targetDate}/>
                    </ul>

                    <ul className='calendar-wrapper__container' id='calendar'>
                       <RenderDate dates={dates.slice(14, 21)} week={3} currentDate={{year:currentYear,month:currentMonth}} targetDate={targetDate}/>

                    </ul>

                    <ul className='calendar-wrapper__container' id='calendar'>
                       <RenderDate dates={dates.slice(21, 28)} week={4} currentDate={{year:currentYear,month:currentMonth}} targetDate={targetDate}/>

                    </ul>

                    <ul className='calendar-wrapper__container' id='calendar'>
                       <RenderDate dates={dates.slice(28, 35)} week={5} currentDate={{year:currentYear,month:currentMonth}} targetDate={targetDate}/>
                    </ul>
                    <ul className='calendar-wrapper__container' id='calendar'>
                       <RenderDate dates={dates.slice(35, 42)} week={6} currentDate={{year:currentYear,month:currentMonth}} targetDate={targetDate}/>
                    </ul>
                </ul>

                <div className="dropdown-menu dropdown-menu--time" id="calendar" ref={dropdownMenuRef}>
                    <button className="dropdown-menu__select-btn" onClick={ChangeVisibleDropdownMenu} id="calendar">{time}</button>
                    <div id="calendar" className="dropdown-menu__content" style={{display: 'none'}} ref={dropdownMenuContentRef}>
                        <RenderTimeBtn ChangeTime={ChangeTime} currentTime={time}/>
                    </div>
                </div>

            </div>

            <button 
                className='task-info-window__date'
                onClick={ChangeStateCalendar}>
                    {dateButtonValue + (taskTime!==''?', ':'') + taskTime}
            </button>
        </div>
    )
}

export default Calendar