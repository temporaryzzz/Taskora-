import '../../styles.scss';
import { useContext, useRef, useState, type FormEvent } from 'react';
import { TaskInfoContext } from "./task-page";
import { AddTask } from '../../scripts/dataTaskManager';


function CreateTaskForm() {

    const taskList = useContext(TaskInfoContext)
    const inputTitleTaskRef = useRef<HTMLInputElement>(null)
    const [taskTitle, setTaskTitile] = useState<string>()

    const createTask = (event : FormEvent) => {
        event.preventDefault()

        if((/\S/.test(taskTitle??''))) {
            
            if(taskList && taskList.tasks) {
                const taskId = String(Number(taskList?.tasks[taskList.tasks?.length - 1].id) + 1)
                
                taskList?.tasks?.push({id: taskId, title: taskTitle??'', description: '', time: '', completed: false, priority: 'default'})
                AddTask(taskId, taskTitle??'',  '', '', 'default')
                taskList?.updateList()
                
                if(inputTitleTaskRef.current) inputTitleTaskRef.current.value = ''
            }
        }
    }

    return (
        <form className='create-task-form' onSubmit={(event) => createTask(event)}>
            <input className='create-task-form__title-input'
                    placeholder='Добавить задачу...' 
                    ref={inputTitleTaskRef} 
                    onChange={(e) => {setTaskTitile(e.target.value)}}>
            </input>    
        </form>
    )
}

export default CreateTaskForm;