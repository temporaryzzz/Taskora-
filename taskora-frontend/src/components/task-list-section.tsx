import { useContext, useState } from "react";
import { TaskManagerContext } from "../App";

type TaskListSectionProps = {section: string};

export function TaskListSection(props: TaskListSectionProps) {
    const taskManagerContext = useContext(TaskManagerContext)
    const [sectionTitle, setSectionTitle] = useState<string>(props.section)

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
            <ul className="task-list__section-body"></ul>
        </section>
    )
}