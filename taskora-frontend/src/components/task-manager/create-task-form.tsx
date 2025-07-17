import '../../styles.scss';
import { useContext, useRef, useState, type FormEvent } from 'react';
import { TaskInfoContext } from "./task-page";
//import type { TaskInfo } from './task-page';

function CreateTaskForm() {

    const taskList = useContext(TaskInfoContext)
    const inputTitleTaskRef = useRef<HTMLInputElement>(null)
    const [taskTitle, setTaskTitile] = useState<string>()

    const createTask = (event : FormEvent) => {
        event.preventDefault()
        taskList?.tasks?.push({id: 100, title: taskTitle??'', description: '', time: '', completed: false})
        taskList?.updateList()
        if(inputTitleTaskRef.current){
            inputTitleTaskRef.current.value = ''
        }
    }

    return (
        <form className='create-task' onSubmit={(event) => createTask(event)}>
            <input placeholder='Добавить задачу...' ref={inputTitleTaskRef} onChange={(e) => {setTaskTitile(e.target.value)}}></input>    
        </form>
    )
}

export default CreateTaskForm;