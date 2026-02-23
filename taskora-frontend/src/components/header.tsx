import { memo } from "react";


type HeaderProps = {
    currentListTitle?: string;
}

function Header({ currentListTitle }: HeaderProps) {

    return(
        <header className="header" data-js-header>
            <div className="header__body">
                <div className="header__body-main">
                    <div className="header__overlay">
                        <a href="/main" className="icon icon--logo-small">Taskora~</a>
                    </div>
                    <h1 className="header__title h3">{currentListTitle ? currentListTitle : ''}</h1>
                </div>
                <button className="header__settings"></button>
            </div>
        </header>
    )
}

export default memo(Header);