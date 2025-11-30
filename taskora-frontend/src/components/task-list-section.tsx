import { useContext, useEffect, useState } from "react";
import { TaskManagerContext } from "../App";
import { TaskComponent } from "./task";
import type { Task } from "../interfaces";
import { CreateTaskForm } from "./create-task-form";
type TaskListSectionProps = {
    section: string,
};

export function TaskListSection(props: TaskListSectionProps) {
    const taskManagerContext = useContext(TaskManagerContext)
    if(taskManagerContext == undefined || taskManagerContext.state.currentList == undefined) {
        return
    }
    
    const [sectionTitle, setSectionTitle] = useState<string>(props.section)
    const [completedTasks, setCompletedTasks] = useState<Task[]>(taskManagerContext.state.tasks.filter((task) => task.completed == true && task.section == sectionTitle))
    const [activeTasks, setActiveTasks] = useState<Task[]>(taskManagerContext.state.tasks.filter((task) => task.completed == false && task.section == sectionTitle))
    const [showCreateTaskForm, setShowCreateTaskForm] = useState<boolean>(false)

    const handleBlur = () => {
        if(taskManagerContext?.state.currentList) {
            const list = taskManagerContext.state.currentList
            const updatedSections = list.sections?.map(section => section === props.section ? section = sectionTitle : section);
            taskManagerContext.actions.updateList(list.id, 
                {title: list.title, icon: list.icon, color: list.color, sections: updatedSections, viewType: list.viewType})
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
                    <button className="button button--white-add" onClick={() => setShowCreateTaskForm(true)}></button>
                    <div className="task-list__section-button-wrapper">
                        <span className="three-dots-menu three-dots-menu--active"></span>
                    </div>
                </span>
                <CreateTaskForm section={sectionTitle} showForm={showCreateTaskForm} setShowForm={setShowCreateTaskForm}/>
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