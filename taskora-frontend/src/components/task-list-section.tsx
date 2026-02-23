import { useCallback, useContext, useEffect, useMemo, useState } from "react";
import { StateContext, ActionsContext } from "../App";
import TaskComponent from "./task";
import CreateTaskForm from "./create-task-form";
type TaskListSectionProps = {
    section: string,
};

export function TaskListSection(props: TaskListSectionProps) {
    const state = useContext(StateContext)
    const actions = useContext(ActionsContext)
    if(state == undefined || state.currentList == undefined || actions == undefined) {
        return
    }
    
    const [sectionTitle, setSectionTitle] = useState<string>(props.section)
    const activeTasks = useMemo(() => state.tasks.filter((task) => task.completed == false && task.section == sectionTitle), [state.tasks, sectionTitle])
    const completedTasks = useMemo(() => state.tasks.filter((task) => task.completed == true && task.section == sectionTitle), [state.tasks, sectionTitle])
    const [showCreateTaskForm, setShowCreateTaskForm] = useState<boolean>(false)

    //Надо будет отправлять запрос на обновление section у задач этой секции
    const handleBlur = () => {
        if(state?.currentList && props.section !== sectionTitle) {
            const list = state.currentList
            const updatedSections = list.sections?.map((section: string) => section === props.section ? section = sectionTitle : section);
            actions.updateList(list.id, 
                {title: list.title, icon: list.icon, color: list.color, sections: updatedSections, viewType: list.viewType})
        }
    }

    const setShowForm = useCallback((value: boolean) => {
        setShowCreateTaskForm(value)
    }, [])

    useEffect(() => {
        setSectionTitle(props.section)
    }, [props.section])

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
                <CreateTaskForm section={sectionTitle} showForm={showCreateTaskForm} setShowForm={setShowForm} currentListId={state.currentList.id} viewType={state.currentList.viewType} onCreateTask={actions.createTask}/>
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
                    <p className="task-list__section-body-title" style={{'display' : completedTasks.length > 0 ? 'block' : 'none'}}>Completed • {completedTasks.length}</p>
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