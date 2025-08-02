import '../styles.scss';
import { useContext, useEffect, useRef } from 'react';
import { TaskInfoContext } from "./task-manager/task-page";
import { DeleteTask } from '../scripts/dataTaskManager';


function ContextMenu({setColorPriority, active, x, y} : {setColorPriority: (color: string, priority: 'red' | 'blue' | 'green' | 'default') => void, active: boolean, x: number, y: number}) {
    const stateClasses = {
        hiddenMenu: 'context-menu',
        activeMenu: 'context-menu--active'
    }

    const stateColors = {
        red: '#d52b24',
        blue: '#1962e8',
        green: '#238636',
        gray: '#818c99b3',
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
            DeleteTask(currentTask.id)
            const currentTaskIndex = taskManagerContext.tasks.findIndex(task => task.id === currentTask.id)
            taskManagerContext.tasks.splice(currentTaskIndex, 1)
        }
    }

    useEffect(() => changeVisibleMenu(active), [active])

    return (
        <ul className='context-menu' ref={contextMenuRef}>
            <span className='context-menu__title'>
                <p>Приоритет</p>
            </span>
            <ul className='context-menu__container'>
                <li className='context-menu__item context-menu__item--priority' onMouseDown={() => setColorPriority(stateColors.red, 'red')}>
                    <img src='/red-priority-icon.svg' width={'23px'} height={'23px'} style={{margin: '0 auto'}}></img>
                </li>

                <li className='context-menu__item context-menu__item--priority' onMouseDown={() => setColorPriority(stateColors.blue, 'blue')}>
                    <img src='/blue-priority-icon.svg' width={'23px'} height={'23px'} style={{margin: '0 auto'}}></img>
                </li>

                <li className='context-menu__item context-menu__item--priority' onMouseDown={() => setColorPriority(stateColors.green, 'green')}>
                    <img src='/green-priority-icon.svg' width={'23px'} height={'23px'} style={{margin: '0 auto'}}></img>
                </li>

                <li className='context-menu__item context-menu__item--priority' onMouseDown={() => setColorPriority(stateColors.gray, 'default')}>
                    <img src='/gray-priority-icon.svg' width={'23px'} height={'23px'} style={{margin: '0 auto'}}></img>
                </li>
            </ul>

            <li className='context-menu__item'>Перенести на завтра</li>
            <li className='context-menu__item'>Добавить подзадачу</li>
            <li className='context-menu__item'>Прикрепить файл</li>
            <li className='context-menu__item context-menu__item--delete' onMouseDown={() => deleteTask()}>
                    Удалить
            </li>
        </ul>
    )
}

export default ContextMenu;