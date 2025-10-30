import { useContext, useEffect } from 'react'
import '../styles/main.scss'
import { TaskManagerContext } from '../App'
import { useNavigate } from 'react-router'

function MainPage() {
    const navigate = useNavigate()
    const taskManagerContext = useContext(TaskManagerContext)

    useEffect(() => {
        if(taskManagerContext?.state.user == undefined) {
            navigate('../');

        }
    })

    return(
        <>
            <h1>TASKORA</h1>
        </>
    )
}

export default MainPage