import '../styles/main.scss'
import SideBar from './side-bar'
import Header from './header'
import TaskList from './task-list'
import { TaskDetailsWindow } from './task-details-window'
import { useContext } from 'react'
import { StateContext, ActionsContext } from '../App'

function MainPage() {
    const state = useContext(StateContext)
    const actions = useContext(ActionsContext)

    if(state == undefined) return
    if(actions == undefined) return

    return(
        <>
        <Header currentListTitle={state.currentList?.title} logOut={actions.logOut}/>
            <main>
                <SideBar lists={state.lists}/>
                <TaskList tasks={state.tasks} currentList={state.currentList}/>
                <TaskDetailsWindow />
            </main>
        </>
    )
}

export default MainPage