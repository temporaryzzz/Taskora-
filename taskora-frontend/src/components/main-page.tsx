//import { useContext, useEffect } from 'react'
import '../styles/main.scss'
//import { TaskManagerContext } from '../App'
//import { useNavigate } from 'react-router'
import { SideBar } from './side-bar'
import { Header } from './header'

function MainPage() {
/**
    const navigate = useNavigate()
    const taskManagerContext = useContext(TaskManagerContext)

    useEffect(() => {
        if(taskManagerContext?.state.user == undefined) {
            navigate('../');

        }
    })
 */
    return(
        <>
        <Header />
            <main>
                <SideBar />
            </main>
        </>
    )
}

export default MainPage