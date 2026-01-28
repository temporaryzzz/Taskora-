import { useContext, useState, useEffect, useRef, type FormEvent, memo } from "react";
import { SYSTEM_LIST_IDS } from "../constants";
import { StateContext, ActionsContext } from "../App";
import { TaskListSection } from "./task-list-section";
import type { List, Task } from "../interfaces";
import TaskComponent from "./task";
import CreateTaskForm from "./create-task-form";

type TaskListProps = {
    tasks: Array<Task>;
    currentList?: List;
}

function TaskList(props: TaskListProps) {
    const state = useContext(StateContext)
    const actions = useContext(ActionsContext)
    
    const [completedTasks, setCompletedTasks] = useState<Task[]>(props.tasks.filter((task) => task.completed == true))
    const [activeTasks, setActiveTasks] = useState<Task[]>(props.tasks.filter((task) => task.completed == false))

    useEffect(() => {
        setCompletedTasks(props.tasks.filter((task) => task.completed == true))
        setActiveTasks(props.tasks.filter((task) => task.completed == false))
    }, [props.tasks])

    if(props.currentList && props.currentList.viewType == 'KANBAN') {
        return(
            <div className="task-list">
                <div className="task-list__sections">
                    {props.currentList?.sections.map((section: string, index: number) => {
                        return <TaskListSection section={section} key={index}/>
                    })}
                    {<AddSectionButton />}
                </div>
            </div>
        )
    }
    else if(props.currentList && SYSTEM_LIST_IDS.COMPLETED === props.currentList.id || SYSTEM_LIST_IDS.TODAY === props.currentList?.id || SYSTEM_LIST_IDS.BASKET === props.currentList?.id || SYSTEM_LIST_IDS.ALL === props.currentList?.id) {
        return(
            <div className="task-list task-list--list-view">
                <ul className="task-list__tasks task-list__tasks--active">
                    {activeTasks.map((taskItem) => {
                        return <TaskComponent task={taskItem} key={taskItem.id}/>
                    })}
                </ul>
                <ul className="task-list__tasks task-list__tasks--completed">
                    <p className="task-list__section-body-title" style={{'display' : completedTasks.length > 0 ? 'block' : 'none'}}>Completed • {completedTasks.length}</p>
                    {completedTasks.map((taskItem) => {
                        return <TaskComponent task={taskItem} key={taskItem.id}/>
                    })}
                </ul>
            </div>
        )
    }
    else if(props.currentList && props.currentList.viewType == 'LIST' && props.currentList.id >= 0) {
        if(state == undefined || actions == undefined) {
            return
        }
        return(
            <div className={state.selectedTask == null ? "task-list task-list--list-view right-border" : "task-list task-list--list-view"}>
                <CreateTaskForm section="Main Section" showForm={true} currentListId={props.currentList.id} onCreateTask={actions.createTask}/>
                <ul className="task-list__tasks task-list__tasks--active">
                    {activeTasks.map((taskItem) => {
                        return <TaskComponent task={taskItem} key={taskItem.id}/>
                    })}
                </ul>
                <ul className="task-list__tasks task-list__tasks--completed">
                    <p className="task-list__section-body-title" style={{'display' : completedTasks.length > 0 ? 'block' : 'none'}}>Completed • {completedTasks.length}</p>
                    {completedTasks.map((taskItem) => {
                        return <TaskComponent task={taskItem} key={taskItem.id}/>
                    })}
                </ul>
            </div>
        )
    }
}

function AddSectionButton() {
    const state = useContext(StateContext)
    const actions = useContext(ActionsContext)
    const addInputRef = useRef<HTMLInputElement>(null)
    const addButtonRef = useRef<HTMLButtonElement>(null)

    if(state == undefined || actions == undefined) {
        return
    }

    const switchInput = (active: boolean) => {
        if(addInputRef.current && addButtonRef.current) {
            if(active) {
                addInputRef.current.classList.remove('visually-hidden')
                addButtonRef.current.classList.add('visually-hidden')
                addInputRef.current.focus()
            }
            else {
                addInputRef.current.classList.add('visually-hidden')
                addButtonRef.current.classList.remove('visually-hidden')
            }
        }
    }

    const addSection = (event: FormEvent) => {
        event.preventDefault()
        if(addInputRef.current && /\S/.test(addInputRef.current.value ?? '') && state.currentList) {
            const list = state.currentList
            actions.updateList(list.id, 
                {...list, sections: [...list.sections, addInputRef.current.value]})
            addInputRef.current.value = ''
            switchInput(false)
        }
    }

    if(state.currentList &&  state.currentList.id >= 0) {
        return(
            <section className="task-list__section">
                <form className="task-list__section-title-wrapper" onSubmit={(event) => addSection(event)}>
                    <button className="task-list__section-button button button--add" 
                            ref={addButtonRef}
                            onClick={() => switchInput(true)}>
                        Add section
                    </button>
                    <input type="text" ref={addInputRef} 
                        className="task-list__section-input visually-hidden" 
                        id='add-section'
                        placeholder="New section"
                        onBlur={() => switchInput(false)}/>
                </form>
            </section>
        )
    }
}

export default memo(TaskList);