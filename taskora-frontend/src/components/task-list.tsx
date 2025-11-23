import { useContext, useRef, type FormEvent } from "react";
import { TaskManagerContext } from "../App";
import { TaskListSection } from "./task-list-section";

export function TaskList() {
    const taskManagerContext = useContext(TaskManagerContext)

    if(taskManagerContext == undefined) {
        return
    }

    return(
        <div className="task-list">
            <div className="task-list__sections">
                {taskManagerContext.state.currentList?.sections.map((section: string, index: number) => {
                    return <TaskListSection section={section} key={index}/>
                })}
                {<AddSectionButton />}
            </div>
        </div>
    )
}

function AddSectionButton() {
    const taskManagerContext = useContext(TaskManagerContext)
    const addInputRef = useRef<HTMLInputElement>(null)
    const addButtonRef = useRef<HTMLButtonElement>(null)

    if(taskManagerContext == undefined) {
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
        if(addInputRef.current && /\S/.test(addInputRef.current.value ?? '') && taskManagerContext.state.currentList) {
            const list = taskManagerContext.state.currentList
            taskManagerContext.actions.updateList(list.id, 
                {...list, sections: [...list.sections, addInputRef.current.value]})
            addInputRef.current.value = ''
            switchInput(false)
        }
    }

    if(taskManagerContext.state.currentList &&  taskManagerContext.state.currentList.id >= 0) {
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