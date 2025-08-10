import '../../styles.scss';
import { useContext, useEffect, useRef, useState } from "react";
import { TaskInfoContext } from "../task-manager/task-page";
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

    const taskDate = useContext(TaskInfoContext)?.currentTaskInfo?.date

    const [date, setDate] = useState(new Date())
    const [targetDate, setTargetDate] = useState<Date | undefined>()
    const [currentMonth, setCurrentMonth] = useState(date.getMonth())
    const [currentYear, setCurrentYear] = useState(date.getFullYear())
    const [firstDayCurrentMonth, setFirstDayCurrentMonth] = useState((new Date(currentYear, currentMonth, 1)).getDay())
    const [dateButton, setDateButton] = useState('Установите дату')
    const [dates, setDates] = useState<number[]>([])
    const calendarRef = useRef<HTMLDivElement>(null)

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

    const changeCurrentMonth = (direction: '+' | '-') => {
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

    document.addEventListener('mousedown', (e) => { 
        if(e.target instanceof HTMLElement) {
            if(e.target.id !== 'calendar' && !e.target.classList.contains('task-info-window__date')){
                if(calendarRef.current)  
                    calendarRef.current.style.display = 'none'
            }
        }
    })

    useEffect(() => setFirstDayCurrentMonth((new Date(currentYear, currentMonth, 1)).getDay()), [currentMonth])
    useEffect(() => InizializateDates(), [firstDayCurrentMonth, currentMonth])
    useEffect(() => {setDate(new Date(taskDate??date))}, [taskDate])
    useEffect(() => {
        if(taskDate != undefined) {
            setDateButton(daysState[date.getDay()] + ', ' + date.getDate() + ' ' + monthState[date.getMonth()] + ' ' + date.getFullYear())
            setTargetDate(date)
            setCurrentMonth(date.getMonth())
            setCurrentYear(date.getFullYear())
        }
        else {
            //Если дата не задана
            setTargetDate(undefined)
            setDateButton('Установите дату')
        }
    }, [date])

    return(
        <div>
            <div className='calendar-wrapper' id='calendar' style={{display: 'none'}} ref={calendarRef}>
                <div className='calendar-wrapper__header' id='calendar'>
                    <button className='calendar-wrapper__month-button' id='calendar' 
                        onClick={() => changeCurrentMonth('-')}>
                    </button>
                    <div className='calendar-wrapper__month' id='calendar'>
                        <p>{monthState[currentMonth + 12]} {currentYear}</p>
                    </div>
                    <button className='calendar-wrapper__month-button' id='calendar' 
                        onClick={() => changeCurrentMonth('+')}>
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
            </div>

            <button 
                className='task-info-window__date'
                onClick={ChangeStateCalendar}>
                    {dateButton}
            </button>
        </div>
    )
}

export default Calendar