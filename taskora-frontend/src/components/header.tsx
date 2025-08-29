import { useRef, useEffect } from 'react';
import { useNavigate } from 'react-router';
import '../styles.scss';

// Определяем возможные значения active
type ActiveTab = 'profile' | 'task-lists' | 'task-board';


type HeaderProps = {
  active: ActiveTab;
  username: string;
};

function Header(props: HeaderProps) {

    const navigate = useNavigate()

    const profileRef = useRef<HTMLButtonElement>(null);
    const taskListsRef = useRef<HTMLButtonElement>(null);
    const taskBoardRef = useRef<HTMLButtonElement>(null);

    const setActiveTab = (active: string) => {
        if (profileRef.current) profileRef.current.classList.remove("tabs__tab--active");
        if (taskListsRef.current) taskListsRef.current.classList.remove("tabs__tab--active");
        if (taskBoardRef.current) taskBoardRef.current.classList.remove("tabs__tab--active");

        // Устанавливаем активный класс для нужной кнопки
        switch (active) {
            case "profile":
                if (profileRef.current) profileRef.current.classList.add("tabs__tab--active");
                break;
            case "task-lists":
                if (taskListsRef.current) taskListsRef.current.classList.add("tabs__tab--active");
                break;
            case "task-board":
                if (taskBoardRef.current) taskBoardRef.current.classList.add("tabs__tab--active");
                break;
            default:
                console.log(`Неизвестный активный элемент: ${active}`);
        }
    }

    useEffect(() => {setActiveTab(props.active)}, [props.active])

    return (
        <header>
            <nav className="tabs">
                <button 
                    id="profile" 
                    ref={profileRef} 
                    className="tabs__tab" 
                    onClick={() => navigate('../profile', {replace: false})}>
                        {props.username}
                </button> 

                <button 
                    id="task-lists" 
                    ref={taskListsRef} 
                    className="tabs__tab" 
                    onClick={() => navigate('../task-lists', {replace: false})}>
                        Task-manager
                </button>

                <button 
                    id="task-board" 
                    ref={taskBoardRef} 
                    className="tabs__tab" 
                    onClick={() => navigate('../task-board', {replace: false})}>
                        Task-board
                </button>
            </nav>
        </header>
    )
}

export default Header;