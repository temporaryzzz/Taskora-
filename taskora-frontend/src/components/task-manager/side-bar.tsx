//import { useState, useRef, useEffect } from 'react';
import '../../styles.scss';
import SideBarButton from './side-bar-button';


function SideBar() {
    

    return (
        <ul className='side-bar'> 
            <SideBarButton active={true}/>
            <SideBarButton active={false}/>
            <SideBarButton active={false}/>
            <SideBarButton active={false}/>
            <SideBarButton active={false}/>
        </ul>    
    )
}

export default SideBar;