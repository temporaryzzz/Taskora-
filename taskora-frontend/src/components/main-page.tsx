import '../styles/main.scss'
import { SideBar } from './side-bar'
import { Header } from './header'
import { TaskList } from './task-list'

function MainPage() {
    return(
        <>
        <Header />
            <main>
                <SideBar />
                <TaskList />
            </main>
        </>
    )
}

export default MainPage