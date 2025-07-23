//import { useState, useRef, useEffect } from 'react';
import '../../styles.scss';
import SideBarButton from './side-bar-button';


function SideBar() {
    

    return (
        <div className='side-bar'> 
            <ul className='side-bar__items-list'>
                <SideBarButton active={true}/>
                <SideBarButton active={false}/>
                <SideBarButton active={false}/>
                <SideBarButton active={false}/>
                <SideBarButton active={false}/>
            </ul>
        </div>    
    )
}

export default SideBar;