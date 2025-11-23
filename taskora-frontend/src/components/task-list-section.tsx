import { useContext, useState } from "react";
import { TaskManagerContext } from "../App";
import { TaskComponent } from "./task";
import type { Task } from "../interfaces";

type TaskListSectionProps = {section: string};

export function TaskListSection(props: TaskListSectionProps) {
    const taskManagerContext = useContext(TaskManagerContext)
    if(taskManagerContext == undefined) {
        return
    }
    const [sectionTitle, setSectionTitle] = useState<string>(props.section)
    const [completedTasks] = useState<Task[]>(taskManagerContext.state.tasks.filter((task) => task.completed == true && task.section == sectionTitle))

    const handleBlur = () => {
        if(taskManagerContext?.state.currentList) {
            const list = taskManagerContext.state.currentList
            const updatedSections = list.sections?.map(section => section === props.section ? section = sectionTitle : section);
            taskManagerContext.actions.updateList(list.id, 
                {title: list.title, icon: list.icon, color: list.color, sections: updatedSections, viewType: list.viewType})
        }
    }

    return(
        <section className="task-list__section">
            <div className="task-list__section-title-wrapper">
                <input type="text" className="task-list__section-input" 
                    value={sectionTitle} 
                    onChange={(e) => setSectionTitle(e.target.value)}
                    onBlur={handleBlur}/>
                <span>
                    <div className="task-list__section-button-wrapper">
                        <button className="task-list__section-button-plus button button--add"></button>
                    </div>
                    <div className="task-list__section-button-wrapper">
                        <span className="three-dots-menu three-dots-menu--active"></span>
                    </div>
                </span>
            </div>
            <div className="task-list__section-body">
                <ul className="task-list__section-active-tasks">
                    {taskManagerContext?.state.tasks.map((task) => {
                        if(task.section == sectionTitle && task.completed == false) {
                            return <TaskComponent task={task} key={task.id}/>
                        }
                    })}
                </ul>
                <ul className="task-list__section-completed-tasks">
                    <p className="task-list__section-body-title" style={{'display' : completedTasks.length > 0 ? 'block' : 'none'}}>Completed</p>
                    {completedTasks.map((task) => {
                        if(task.section == sectionTitle && task.completed == true) {
                            return <TaskComponent task={task} key={task.id}/>
                        }
                    })}
                </ul>
            </div>
        </section>
    )
}