//import { useState, useRef, useEffect } from 'react';
import '../../styles.scss';


function Task() {
    

    return (
        <div className='task-list__task'> 
            <input type='checkbox' id='completed'></input>
            <h4>TASK</h4> 
            <p>something task description</p>
        </div>    
    )
}

export default Task;