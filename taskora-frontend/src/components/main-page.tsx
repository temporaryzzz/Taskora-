import '../styles/main.scss'
import SideBar from './side-bar'
import { Header } from './header'
import TaskList from './task-list'
import { TaskDetailsWindow } from './task-details-window'
import { useContext } from 'react'
import { TaskManagerContext } from '../App'

function MainPage() {
    const taskManagerContext = useContext(TaskManagerContext)

    if(taskManagerContext == undefined) {
        return
    }

    return(
        <>
        <Header />
            <main>
                <SideBar lists={taskManagerContext.state.lists}/>
                <TaskList tasks={taskManagerContext.state.tasks} currentList={taskManagerContext.state.currentList}/>
                <TaskDetailsWindow />
            </main>
        </>
    )
}

export default MainPage