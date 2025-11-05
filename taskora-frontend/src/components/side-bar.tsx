import { useContext } from "react";
import { TaskManagerContext } from "../App";
import SideBarButton from "./side-bar-button";

export function SideBar() {
    const taskManagerContext = useContext(TaskManagerContext)

    if(taskManagerContext == undefined) {
        return
    }

    return(
        <div className="side-bar">
            <div className="side-bar__wrapper">
                <ul className="side-bar__list" id="profile">
                    <li className="side-bar__item">
                        <button className="side-bar__button side-bar__button--active button icon icon--profile">Profile</button>
                    </li>
                    <li className="side-bar__item">
                        <button className="side-bar__button button icon icon--stats">Statistics</button>
                    </li>
                </ul>
            </div>
            <div className="side-bar__wrapper side-bar__wrapper--max-hieght">
                <button className="side-bar__button  side-bar__button--title button">Task-lists</button>
                <ul className="side-bar__list" id="lists">
                    {taskManagerContext.state.lists.map((list) => {
                        if(list.id !== 0 && list.id !== 1) {
                            return (<SideBarButton list={list} />)
                        }
                    })}
                </ul>
            </div>
            <div className="side-bar__wrapper">
                <ul className="side-bar__list" id="basket">
                    {taskManagerContext.state.lists.map((list) => {
                        if(list.id == 0 || list.id == 1) {
                            return (<SideBarButton list={list} />)
                        }
                    })}
                </ul>
            </div>
        </div>
    )
}