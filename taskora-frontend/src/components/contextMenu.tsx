import '../styles.scss';
import { useContext, useEffect, useRef } from 'react';
import { TaskInfoContext } from "./task-manager/task-page";
import { DeleteTask } from '../scripts/dataTaskManager';


function ContextMenu({active, x, y} : {active: boolean, x: number, y: number}) {
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
            DeleteTask(currentTask.id)
            const currentTaskIndex = taskManagerContext.tasks.findIndex(task => task.id === currentTask.id)
            taskManagerContext.tasks.splice(currentTaskIndex, 1)
        }
    }

    useEffect(() => changeVisibleMenu(active), [active])

    return (
        <ul className='context-menu' ref={contextMenuRef}>
            Optional menu
            <li className='context-menu__item'>Изменить приоритет</li>
            <li className='context-menu__item'>Перенести на завтра</li>
            <li className='context-menu__item context-menu__item--delete' onMouseDown={() => deleteTask()}>
                    Удалить
            </li>
        </ul>
    )
}

export default ContextMenu;