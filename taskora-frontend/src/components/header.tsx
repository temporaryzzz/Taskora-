import { memo } from "react";


type HeaderProps = {
    currentListTitle?: string;
    logOut: () => void;
}

function Header({ currentListTitle, logOut }: HeaderProps) {


    return(
        <header className="header" data-js-header>
            <div className="header__body">
                <div className="header__body-main">
                    <div className="header__overlay">
                        <a href="/main" className="icon icon--logo-small">Taskora~</a>
                    </div>
                    <h1 className="header__title h3">{currentListTitle ? currentListTitle : ''}</h1>
                </div>
                <div className="header_extra">
                    <button className="header__extra-item icon icon--settings"></button>
                    <button className="header__extra-item icon icon--logout" onClick={() => logOut()}></button>
                </div>
            </div>
        </header>
    )
}

export default memo(Header);