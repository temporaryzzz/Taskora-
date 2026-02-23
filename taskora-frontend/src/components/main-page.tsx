import '../styles/main.scss'
import SideBar from './side-bar'
import Header from './header'
import TaskList from './task-list'
import { TaskDetailsWindow } from './task-details-window'
import { useContext } from 'react'
import { StateContext } from '../App'

function MainPage() {
    const state = useContext(StateContext)

    if(state == undefined) {
        return
    }

    return(
        <>
        <Header currentListTitle={state.currentList?.title}/>
            <main>
                <SideBar lists={state.lists}/>
                <TaskList tasks={state.tasks} currentList={state.currentList}/>
                <TaskDetailsWindow />
            </main>
        </>
    )
}

export default MainPage