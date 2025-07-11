//import { useState, useRef, useEffect } from 'react';
import '../../styles.scss';
import SideBarButton from './side-bar-button';


function SideBar() {
    

    return (
        <div className='side-bar'> 
            <h4>SIDE-BAR</h4> 
            <SideBarButton active={true}/>
            <SideBarButton active={false}/>
            <SideBarButton active={false}/>
            <SideBarButton active={false}/>
            <SideBarButton active={false}/>
        </div>    
    )
}

export default SideBar;