import '../../styles.scss';
import { useContext, useRef, useState, type FormEvent } from 'react';
import { TaskInfoContext } from "./task-page";
import { AddTask } from '../../scripts/dataTaskManager';


function CreateTaskForm() {

    const taskList = useContext(TaskInfoContext)
    const inputTitleTaskRef = useRef<HTMLTextAreaElement>(null)
    const [taskTitle, setTaskTitile] = useState<string>()

    const createTask = (event : FormEvent) => {
        event.preventDefault()

        if((/\S/.test(taskTitle??''))) {
            
            if(taskList && taskList.tasks) {
                const taskId = String(Number(taskList?.tasks[taskList.tasks?.length - 1].id) + 1)
                
                taskList?.tasks?.push({id: taskId, title: taskTitle??'', description: '', time: '', completed: false})
                AddTask(taskId, taskTitle??'',  '', '')
                taskList?.updateList()
                
                if(inputTitleTaskRef.current) inputTitleTaskRef.current.value = ''
            }
        }
    }

    return (
        <form className='create-task' onSubmit={(event) => createTask(event)}>
            <textarea className='create-task create-task__title-area'
                    placeholder='Добавить задачу...' 
                    ref={inputTitleTaskRef} 
                    onChange={(e) => {setTaskTitile(e.target.value)}}>
            </textarea>    
        </form>
    )
}

export default CreateTaskForm;