import { useContext, useEffect, useRef, useState, type FormEvent } from "react";
import { TaskManagerContext } from "../App";
import { TaskComponent } from "./task";
import type { Task } from "../interfaces";

type TaskListSectionProps = {section: string};

export function TaskListSection(props: TaskListSectionProps) {
    const taskManagerContext = useContext(TaskManagerContext)
    if(taskManagerContext == undefined) {
        return
    }
    
    const formAddTaskRef = useRef<HTMLFormElement>(null)
    const inputAddTaskRef = useRef<HTMLInputElement>(null)
    const [sectionTitle, setSectionTitle] = useState<string>(props.section)
    const [completedTasks, setCompletedTasks] = useState<Task[]>(taskManagerContext.state.tasks.filter((task) => task.completed == true && task.section == sectionTitle))
    const [activeTasks, setActiveTasks] = useState<Task[]>(taskManagerContext.state.tasks.filter((task) => task.completed == false && task.section == sectionTitle))
    const stateClasses = {
        hidden: 'visually-hidden',
    }

    const handleBlur = () => {
        if(taskManagerContext?.state.currentList) {
            const list = taskManagerContext.state.currentList
            const updatedSections = list.sections?.map(section => section === props.section ? section = sectionTitle : section);
            taskManagerContext.actions.updateList(list.id, 
                {title: list.title, icon: list.icon, color: list.color, sections: updatedSections, viewType: list.viewType})
        }
    }

    const showAddTaskForm = () => {
        if(formAddTaskRef.current && formAddTaskRef.current.classList.contains(stateClasses.hidden)) {
            formAddTaskRef.current.classList.remove(stateClasses.hidden)
            inputAddTaskRef.current?.focus()
        }
    }

    const handleCreateTask = (event: FormEvent) => {
        event.preventDefault()
        if(inputAddTaskRef.current && /\S/.test(inputAddTaskRef.current.value ?? '') && taskManagerContext.state.currentList) {
            taskManagerContext.actions.createTask({title: inputAddTaskRef.current.value, ownerListId: taskManagerContext.state.currentList.id,
                description: '', deadline: null, section: sectionTitle, priority: 'DEFAULT'})
        }

        if(formAddTaskRef.current && inputAddTaskRef.current) {
            formAddTaskRef.current.classList.add(stateClasses.hidden)
            inputAddTaskRef.current.blur()
            inputAddTaskRef.current.value = '' 
        }
    }

    useEffect(() => {
        setSectionTitle(props.section)
        setCompletedTasks(taskManagerContext.state.tasks.filter((task) => task.completed == true && task.section == sectionTitle))
        setActiveTasks(taskManagerContext.state.tasks.filter((task) => task.completed == false && task.section == sectionTitle))
    }, [props])

    return(
        <section className="task-list__section">
            <div className="task-list__section-title-wrapper">
                <input type="text" className="task-list__section-input" 
                    value={sectionTitle} 
                    onChange={(e) => setSectionTitle(e.target.value)}
                    onBlur={handleBlur}/>
                <span>
                    <div className="task-list__section-button-wrapper" onClick={showAddTaskForm}>
                        <span className="task-list__section-button-plus button button--add" >
                        </span>
                    </div>
                    <div className="task-list__section-button-wrapper">
                        <span className="three-dots-menu three-dots-menu--active"></span>
                    </div>
                </span>
                <form ref={formAddTaskRef} 
                    onSubmit={(e) => handleCreateTask(e)}
                    className="task-list__section-title-wrapper task-list__section-title-wrapper--full-width visually-hidden">
                    <input type="text" 
                        className="task-list__section-input task-list__section-input--full-width" 
                        id='add-task'
                        placeholder="New task"
                        ref={inputAddTaskRef}
                        onBlur={() => {
                            if(formAddTaskRef.current) {
                                formAddTaskRef.current.classList.add(stateClasses.hidden)
                                inputAddTaskRef.current?.blur()
                            }
                        }}/>
                </form>
            </div>
            <div className="task-list__section-body">
                <ul className="task-list__section-active-tasks">
                    {activeTasks.map((task) => {
                        if(task.section == sectionTitle) {
                            return <TaskComponent task={task} key={task.id}/>
                        }
                    })}
                </ul>
                <ul className="task-list__section-completed-tasks">
                    <p className="task-list__section-body-title" style={{'display' : completedTasks.length > 0 ? 'block' : 'none'}}>Completed</p>
                    {completedTasks.map((task) => {
                        if(task.section == sectionTitle) {
                            return <TaskComponent task={task} key={task.id}/>
                        }
                    })}
                </ul>
            </div>
        </section>
    )
}