import { useContext } from "react";
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
                {taskManagerContext.state.currentList?.sections.map((section: string) => {
                    return <TaskListSection section={section}/>
                })}
            </div>
        </div>
    )
}