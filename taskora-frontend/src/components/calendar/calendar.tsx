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
                calendarRef.current.style.display = 'block'
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
                        <button onClick={() => ChangeTime('00:00')} className="dropdown-menu__option-btn" id="calendar">00:00</button>
                        <button onClick={() => ChangeTime('00:30')} className="dropdown-menu__option-btn" id="calendar">00:30</button>
                        <button onClick={() => ChangeTime('01:00')} className="dropdown-menu__option-btn" id="calendar">01:00</button>
                        <button onClick={() => ChangeTime('01:30')} className="dropdown-menu__option-btn" id="calendar">01:30</button>
                        <button onClick={() => ChangeTime('02:00')} className="dropdown-menu__option-btn" id="calendar">02:00</button>
                        <button onClick={() => ChangeTime('02:30')} className="dropdown-menu__option-btn" id="calendar">02:30</button>
                        <button onClick={() => ChangeTime('03:00')} className="dropdown-menu__option-btn" id="calendar">03:00</button>
                        <button onClick={() => ChangeTime('03:30')} className="dropdown-menu__option-btn" id="calendar">03:30</button>
                        <button onClick={() => ChangeTime('04:00')} className="dropdown-menu__option-btn" id="calendar">04:00</button>
                        <button onClick={() => ChangeTime('04:30')} className="dropdown-menu__option-btn" id="calendar">04:30</button>
                        <button onClick={() => ChangeTime('05:00')} className="dropdown-menu__option-btn" id="calendar">05:00</button>
                        <button onClick={() => ChangeTime('05:30')} className="dropdown-menu__option-btn" id="calendar">05:30</button>
                        <button onClick={() => ChangeTime('06:00')} className="dropdown-menu__option-btn" id="calendar">06:00</button>
                        <button onClick={() => ChangeTime('06:30')} className="dropdown-menu__option-btn" id="calendar">06:30</button>
                        <button onClick={() => ChangeTime('07:00')} className="dropdown-menu__option-btn" id="calendar">07:00</button>
                        <button onClick={() => ChangeTime('07:30')} className="dropdown-menu__option-btn" id="calendar">07:30</button>
                        <button onClick={() => ChangeTime('08:00')} className="dropdown-menu__option-btn" id="calendar">08:00</button>
                        <button onClick={() => ChangeTime('08:30')} className="dropdown-menu__option-btn" id="calendar">08:30</button>
                        <button onClick={() => ChangeTime('09:00')} className="dropdown-menu__option-btn" id="calendar">09:00</button>
                        <button onClick={() => ChangeTime('09:30')} className="dropdown-menu__option-btn" id="calendar">09:30</button>
                        <button onClick={() => ChangeTime('10:00')} className="dropdown-menu__option-btn" id="calendar">10:00</button>
                        <button onClick={() => ChangeTime('10:30')} className="dropdown-menu__option-btn" id="calendar">10:30</button>
                        <button onClick={() => ChangeTime('11:00')} className="dropdown-menu__option-btn" id="calendar">11:00</button>
                        <button onClick={() => ChangeTime('11:30')} className="dropdown-menu__option-btn" id="calendar">11:30</button>
                        <button onClick={() => ChangeTime('12:00')} className="dropdown-menu__option-btn" id="calendar">12:00</button>
                        <button onClick={() => ChangeTime('12:30')} className="dropdown-menu__option-btn" id="calendar">12:30</button>
                        <button onClick={() => ChangeTime('13:00')} className="dropdown-menu__option-btn" id="calendar">13:00</button>
                        <button onClick={() => ChangeTime('13:30')} className="dropdown-menu__option-btn" id="calendar">13:30</button>
                        <button onClick={() => ChangeTime('14:00')} className="dropdown-menu__option-btn" id="calendar">14:00</button>
                        <button onClick={() => ChangeTime('14:30')} className="dropdown-menu__option-btn" id="calendar">14:30</button>
                        <button onClick={() => ChangeTime('15:00')} className="dropdown-menu__option-btn" id="calendar">15:00</button>
                        <button onClick={() => ChangeTime('15:30')} className="dropdown-menu__option-btn" id="calendar">15:30</button>
                        <button onClick={() => ChangeTime('16:00')} className="dropdown-menu__option-btn" id="calendar">16:00</button>
                        <button onClick={() => ChangeTime('16:30')} className="dropdown-menu__option-btn" id="calendar">16:30</button>
                        <button onClick={() => ChangeTime('17:00')} className="dropdown-menu__option-btn" id="calendar">17:00</button>
                        <button onClick={() => ChangeTime('17:30')} className="dropdown-menu__option-btn" id="calendar">17:30</button>
                        <button onClick={() => ChangeTime('18:00')} className="dropdown-menu__option-btn" id="calendar">18:00</button>
                        <button onClick={() => ChangeTime('18:30')} className="dropdown-menu__option-btn" id="calendar">18:30</button>
                        <button onClick={() => ChangeTime('19:00')} className="dropdown-menu__option-btn" id="calendar">19:00</button>
                        <button onClick={() => ChangeTime('19:30')} className="dropdown-menu__option-btn" id="calendar">19:30</button>
                        <button onClick={() => ChangeTime('20:00')} className="dropdown-menu__option-btn" id="calendar">20:00</button>
                        <button onClick={() => ChangeTime('20:30')} className="dropdown-menu__option-btn" id="calendar">20:30</button>
                        <button onClick={() => ChangeTime('21:00')} className="dropdown-menu__option-btn" id="calendar">21:00</button>
                        <button onClick={() => ChangeTime('21:30')} className="dropdown-menu__option-btn" id="calendar">21:30</button>
                        <button onClick={() => ChangeTime('22:00')} className="dropdown-menu__option-btn" id="calendar">22:00</button>
                        <button onClick={() => ChangeTime('22:30')} className="dropdown-menu__option-btn" id="calendar">22:30</button>
                        <button onClick={() => ChangeTime('23:00')} className="dropdown-menu__option-btn" id="calendar">23:00</button>
                        <button onClick={() => ChangeTime('23:30')} className="dropdown-menu__option-btn" id="calendar">23:30</button>
                    </div>
                </div>

            </div>

            <button 
                className='task-info-window__date'
                onClick={ChangeStateCalendar}>
                    {dateButtonValue + ', ' + taskTime}
            </button>
        </div>
    )
}

export default Calendar