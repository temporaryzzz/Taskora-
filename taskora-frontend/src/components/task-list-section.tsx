
type TaskListSectionProps = {section: string};

export function TaskListSection(props: TaskListSectionProps) {
    return(
        <section className="task-list__section">
            <div className="task-list__section-title-wrapper">
                <button className="task-list__section-title button">
                    {props.section}
                </button>
                <span>
                    <div className="task-list__section-button-wrapper">
                        <span className="three-dots-menu three-dots-menu--active"></span>
                    </div>
                    <div className="task-list__section-button-wrapper">
                        <button className="task-list__section-title task-list__section-title--plus button"></button>
                    </div>
                </span>
            </div>
            <ul className="task-list__section-body"></ul>
        </section>
    )
}