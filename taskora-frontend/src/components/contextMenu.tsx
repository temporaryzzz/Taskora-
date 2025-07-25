import '../styles.scss';
import { useEffect, useRef } from 'react';


function ContextMenu({active, x, y} : {active: boolean, x: number, y: number}) {
    const stateClasses = {
        hiddenMenu: 'context-menu',
        activeMenu: 'context-menu--active'
    }

    const contextMenuRef = useRef<HTMLDivElement>(null)

    const changeVisibleMenu = (active: boolean) => {
        if(contextMenuRef.current) {
            if(active == true) {
                contextMenuRef.current.classList.add(stateClasses.activeMenu)
                contextMenuRef.current.style.left = `${x}px`
                contextMenuRef.current.style.top = `${y}px`
                console.log(x, y, contextMenuRef.current.style.left, contextMenuRef.current.style.top)

            }

            else {
                contextMenuRef.current.classList.remove(stateClasses.activeMenu)
            }
        }
    }

    useEffect(() => changeVisibleMenu(active), [active])

    return (
        <div className='context-menu' ref={contextMenuRef}>
            Context Menu
        </div>
    )
}

export default ContextMenu;