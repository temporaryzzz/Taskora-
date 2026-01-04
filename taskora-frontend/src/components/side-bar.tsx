import { memo, useState } from "react";
import { SYSTEM_LIST_IDS } from "../constants";
import { CreateListForm } from './create-list-form'
import SideBarButton from "./side-bar-button";
import type { List } from "../interfaces";

type SideBarProps = {
    lists: Array<List>;
}

function SideBar(props: SideBarProps) {
    const [activeCreateForm, setActiveCreateForm] = useState<boolean>(false)

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
                <button className="side-bar__button  side-bar__button--title button" onClick={() => setActiveCreateForm(true)}>Task-lists</button>
                <CreateListForm activeCreateForm={activeCreateForm} setActiveCreateForm={setActiveCreateForm}/>
                <ul className="side-bar__list" id="lists">
                    {props.lists.map((list) => {
                        if(list.id !== SYSTEM_LIST_IDS.COMPLETED && list.id !== SYSTEM_LIST_IDS.BASKET) {
                            return (<SideBarButton list={list} key={list.id}/>)
                        }
                    })}
                </ul>
            </div>
            <div className="side-bar__wrapper">
                <ul className="side-bar__list" id="system-lists">
                    {props.lists.map((list) => {
                        if(list.id == SYSTEM_LIST_IDS.COMPLETED || list.id == SYSTEM_LIST_IDS.BASKET) {
                            return (<SideBarButton list={list} key={list.id}/>)
                        }
                    })}
                </ul>
            </div>
        </div>
    )
}

export default memo(SideBar);