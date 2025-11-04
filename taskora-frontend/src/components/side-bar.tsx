import { useContext } from "react";
import { TaskManagerContext } from "../App";


export function SideBar() {
    const taskManagerContext = useContext(TaskManagerContext)

    return(
        <div className="side-bar">
            <div className="side-bar__wrapper">
                <ul className="side-bar__list" id="profile">
                    <li className="side-bar__item">
                        <button className="side-bar__button button icon icon--profile">Profile</button>
                    </li>
                    <li className="side-bar__item">
                        <button className="side-bar__button button icon icon--stats">Statistics</button>
                    </li>
                </ul>
            </div>
            <div className="side-bar__wrapper side-bar__wrapper--max-hieght">
                <button className="side-bar__button  side-bar__button--title button">Task-lists</button>
                <ul className="side-bar__list" id="lists">
                    <li className="side-bar__item">
                        <button className="side-bar__button button icon icon--circle-default">All</button>
                    </li>
                    <li className="side-bar__item">
                        <button className="side-bar__button button icon icon--inbox">Inbox</button>
                    </li>
                    <li className="side-bar__item">
                        <button className="side-bar__button button icon icon--circle-default">Today</button>
                    </li>
                </ul>
            </div>
            <div className="side-bar__wrapper">
                <ul className="side-bar__list" id="basket">
                    <li className="side-bar__item">
                        <button className="side-bar__button button icon icon--completed">Completed</button>
                    </li>
                    <li className="side-bar__item">
                        <button className="side-bar__button button icon icon--basket">Basket</button>
                    </li>
                </ul>
            </div>
        </div>
    )
}