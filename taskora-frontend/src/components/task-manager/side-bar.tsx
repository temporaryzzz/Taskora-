import { useContext, useEffect, useState } from 'react';
import '../../styles.scss';
import SideBarButton from './side-bar-button';
import { TaskInfoContext } from '../../App';
import type { List } from '../../App';


function SideBar() {
    
    const TaskManagerContext = useContext(TaskInfoContext)
    const [lists, setLists] = useState<Array<List> | undefined>()

    useEffect(() => {
        setLists(TaskManagerContext?.lists)
    }, [TaskManagerContext?.lists])

    return (
        <div className='side-bar'> 
            <ul className='side-bar__items-list'>
                {lists?.map(list => 
                    <SideBarButton list={list}/>
                )}
            </ul>
        </div>    
    )
}

export default SideBar;