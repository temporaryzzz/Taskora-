import { useRef, useEffect } from 'react';
import '../../styles.scss';

type SideBarButton = {
  active: boolean;
};

function SideBarButton(props: SideBarButton) {
    const activeRef = useRef<HTMLLIElement>(null);

    const setActiveButton = (active: boolean) => {
        if(active == true) {
            if (activeRef.current) activeRef.current.classList.add("side-bar__button--active");
        }

        else {
            if (activeRef.current) activeRef.current.classList.remove("side-bar__button--active");
        }
    }

    useEffect(() => {setActiveButton(props.active)}, [props.active])

    return (
        <li>
            <li className='side-bar__button' ref={activeRef}>
                <div className='icon icon--inbox-list'></div>
                <h5>TASK-LIST</h5> 
            </li>    
        </li>

    )
}

export default SideBarButton;