//import { useState, useRef, useEffect } from 'react';
import '../../styles.scss';
import SideBarButton from './side-bar-button';


function SideBar() {
    

    return (
        <div className='side-bar'> 
            SIDE-BAR 
            <SideBarButton />
            <SideBarButton />
            <SideBarButton />
            <SideBarButton />
            <SideBarButton />
        </div>    
    )
}

export default SideBar;