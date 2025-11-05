import { useContext, useEffect } from 'react'
import '../styles/main.scss'
import { TaskManagerContext } from '../App'
import { useNavigate } from 'react-router'
import { SideBar } from './side-bar'

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
            <header className="header" data-js-header>
                <div className="header__body">
                    <div className="header__body-main">
                        <div className="header__overlay">
                            <a href="/main" className="icon icon--logo-small">Taskora~</a>
                        </div>
                        <h1 className="header__title h3">Open list name</h1>
                    </div>
                    <button className="header__settings"></button>
                </div>
            </header>
            <main>
                <SideBar />
            </main>
        </>
    )
}

export default MainPage