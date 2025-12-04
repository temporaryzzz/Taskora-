import { useContext } from "react"
import { TaskManagerContext } from "../App"


export function Header() {
    const taskManagerContext = useContext(TaskManagerContext)

    if(taskManagerContext == undefined) {
        return
    }

    return(
        <header className="header" data-js-header>
            <div className="header__body">
                <div className="header__body-main">
                    <div className="header__overlay">
                        <a href="/main" className="icon icon--logo-small">Taskora~</a>
                    </div>
                    <h1 className="header__title h3">{
                        taskManagerContext.state.lists.map((list) => {
                            if(list.id == taskManagerContext.state.currentList?.id) {
                                return(list.title)
                            }
                        })
                        }</h1>
                </div>
                <button className="header__settings"></button>
            </div>
        </header>
    )
}
