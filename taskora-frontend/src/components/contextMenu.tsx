import '../styles.scss';
import { useContext, useEffect, useRef } from 'react';
import { TaskInfoContext } from "../App";
import { DeleteTask } from '../scripts/dataTaskManager';


function ContextMenu({setColorPriority, active, x, y} : {setColorPriority: (priority: 'highest' | 'high' | 'middle' | 'default') => void, active: boolean, x: number, y: number}) {
    const stateClasses = {
        hiddenMenu: 'context-menu',
        activeMenu: 'context-menu--active'
    }

    const taskManagerContext = useContext(TaskInfoContext)
    const currentTask = taskManagerContext?.currentTaskInfo

    const contextMenuRef = useRef<HTMLUListElement>(null)

    const changeVisibleMenu = (active: boolean) => {
        if(contextMenuRef.current) {
            if(active == true) {
                contextMenuRef.current.classList.add(stateClasses.activeMenu)
                contextMenuRef.current.style.left = `${x}px`
                contextMenuRef.current.style.top = `${y}px`

            }

            else {
                contextMenuRef.current.classList.remove(stateClasses.activeMenu)
            }
        }
    }

    const deleteTask = () => {
        if(currentTask && taskManagerContext.tasks) {
            DeleteTask(currentTask.task_id)
            const currentTaskIndex = taskManagerContext.tasks.findIndex(task => task.task_id === currentTask.task_id)
            taskManagerContext.tasks.splice(currentTaskIndex, 1)
        }
    }

    const PostponeUntilTomorrow = () => {
        if(taskManagerContext && currentTask) {
            const now = new Date()
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 23, 59)
            if(currentTask.date != '') {
                tomorrow.setHours(new Date(currentTask.date).getHours())
                tomorrow.setMinutes(new Date(currentTask.date).getMinutes())
            }
            taskManagerContext.changeCurrentTask(currentTask.title, currentTask.description, String(tomorrow), currentTask.priority)
        }
    }

    useEffect(() => changeVisibleMenu(active), [active])

    return (
        <ul className='context-menu' ref={contextMenuRef} id='context-menu'>
            <span className='context-menu__title'>
                <p>Приоритет</p>
            </span>
            <ul className='context-menu__container'>
                <li className='context-menu__item context-menu__item--priority' onMouseDown={() => setColorPriority('highest')}>
                    <img src='/red-priority-icon.svg' width={'23px'} height={'23px'} style={{margin: '0 auto'}}></img>
                </li>

                <li className='context-menu__item context-menu__item--priority' onMouseDown={() => setColorPriority('high')}>
                    <img src='/blue-priority-icon.svg' width={'23px'} height={'23px'} style={{margin: '0 auto'}}></img>
                </li>

                <li className='context-menu__item context-menu__item--priority' onMouseDown={() => setColorPriority('middle')}>
                    <img src='/green-priority-icon.svg' width={'23px'} height={'23px'} style={{margin: '0 auto'}}></img>
                </li>

                <li className='context-menu__item context-menu__item--priority' onMouseDown={() => setColorPriority('default')}>
                    <img src='/gray-priority-icon.svg' width={'23px'} height={'23px'} style={{margin: '0 auto'}}></img>
                </li>
            </ul>

            <li className='context-menu__item' onMouseDown={PostponeUntilTomorrow}>Перенести на завтра</li>
            <li className='context-menu__item'>Добавить подзадачу</li>
            <li className='context-menu__item'>Прикрепить файл</li>
            <li className='context-menu__item context-menu__item--delete' onMouseDown={() => deleteTask()}>
                    Удалить
            </li>
        </ul>
    )
}

export default ContextMenu;