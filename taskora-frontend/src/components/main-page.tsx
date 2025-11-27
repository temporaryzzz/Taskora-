import '../styles/main.scss'
import { SideBar } from './side-bar'
import { Header } from './header'
import { TaskList } from './task-list'
import { TaskDetailsWindow } from './task-details-window'

function MainPage() {
    return(
        <>
        <Header />
            <main>
                <SideBar />
                <TaskList />
                <TaskDetailsWindow />
            </main>
        </>
    )
}

export default MainPage