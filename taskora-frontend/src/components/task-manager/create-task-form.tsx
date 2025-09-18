import '../../styles.scss';
import { useContext, useRef, useState, type FormEvent } from 'react';
import { TaskInfoContext } from "../../App";
import { AddTask } from '../../scripts/dataTaskManager';


function CreateTaskForm() {

    const taskManagerContext = useContext(TaskInfoContext)
    const inputTitleTaskRef = useRef<HTMLInputElement>(null)
    const [taskTitle, setTaskTitile] = useState<string>()

    const createTask = (event : FormEvent) => {
        event.preventDefault()

        // /\S/ - любой символ кроме пробела
        if((/\S/.test(taskTitle??''))) {
            
            if(taskManagerContext && taskManagerContext.tasks && taskManagerContext.list_id) {
                
                //⁡⁣⁣⁢Получать task_id в ответе на AddTask⁡
                //taskManagerContext?.tasks?.push({task_id: 0, title: taskTitle??'', description: '', date: '', completed: false, priority: 'default'})
                AddTask(taskManagerContext.list_id, taskTitle??'')
                taskManagerContext?.updateList()
                
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