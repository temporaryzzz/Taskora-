import { useContext, useEffect, useRef, useState, type SetStateAction } from "react";
import { TaskManagerContext } from "../App";
import type { CreateListDTO } from "../interfaces";

type CreateListFormnProps = { 
    activeCreateForm: boolean,
    setActiveCreateForm: React.Dispatch<SetStateAction<boolean>>,
 };

export function CreateListForm(props: CreateListFormnProps) {
    const taskManagerContext = useContext(TaskManagerContext)
    const [title, setTitle] = useState<string>('')
    const [color, setColor] = useState<'LIGHT' | 'RED' | 'BLUE' | 'YELLOW' | 'VIOLET' | 'GREEN' | 'NONE'>('NONE')
    const [icon, setIcon] = useState<'DEFAULT' | 'INBOX' | 'ALL' | 'TODAY' | 'COMPLETED' | 'BASKET' | 'LINES' | 'SHEET' | 'FOLDER'>('DEFAULT')
    const createFormRef = useRef<HTMLDivElement>(null)

    if(taskManagerContext  == undefined) {
        return
    }

    const stateClasses ={
        active: "not-clickable--active",
    }

    const createList = () => {
        if(/\S/.test(title ?? '')) {
            if(taskManagerContext.state.user !== undefined) {
                const CreateListDTO: CreateListDTO = {title: title, ownerUserId: taskManagerContext.state.user.id, sections: ['main'], icon: icon, color: color}
                taskManagerContext.actions.createList(CreateListDTO)
                props.setActiveCreateForm(false)
                return true
            }
            else {
                return false
            }
        }
    }

    const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as 'LIGHT' | 'RED' | 'BLUE' | 'YELLOW' | 'VIOLET' | 'GREEN' | 'NONE';
        if (["LIGHT", "RED", "BLUE", "YELLOW", "VIOLET", "GREEN", "NONE"].includes(value)) {
            setColor(value);
        }
    };

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as 'DEFAULT' | 'INBOX' | 'ALL' | 'TODAY' | 'COMPLETED' | 'BASKET' | 'LINES' | 'SHEET' | 'FOLDER';
        if (['DEFAULT', 'INBOX', 'ALL', 'TODAY', 'COMPLETED', 'BASKET', 'LINES', 'SHEET', 'FOLDER'].includes(value)) {
            setIcon(value);
        }
    };

    const toggleVisible = () => {
        if(!createFormRef.current) {
            return
        }
        if(props.activeCreateForm == true) {
            createFormRef.current.classList.add(stateClasses.active)
        }
        else {
            createFormRef.current.classList.remove(stateClasses.active)
        }
    }

    useEffect(() => {
        toggleVisible()
    }, [props.activeCreateForm])

    return(
        <div className="not-clickable" ref={createFormRef}>
            <form className="edit-form">
                <input type="text" className="edit-form__input" placeholder="title" required onChange={(event) => {setTitle(event.target.value)}}/>
                <div className="edit-form__select">
                    <label className="edit-form__select-title" aria-label="List color">List color</label>
                    <ul className="edit-form__select-items" aria-labelledby="List color">
                        <li className="edit-form__select-item edit-form__select-item--color-none">
                            <input type="radio" className="edit-form__select-radio" name="color" id="none" value="NONE" onChange={(event) => {if(event.target.checked) handleColorChange(event)}}/>
                            <label htmlFor="none" className="edit-form__select-label"></label>
                        </li>
                        <li className="edit-form__select-item">
                            <input type="radio" className="edit-form__select-radio" name="color" id="light" value="LIGHT" onChange={(event) => {if(event.target.checked) handleColorChange(event)}}/>
                            <label htmlFor="light" className="edit-form__select-label"></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--color-violet">
                            <input type="radio" className="edit-form__select-radio" name="color" id="violet" value="VIOLET" onChange={(event) => {if(event.target.checked) handleColorChange(event)}}/>
                            <label htmlFor="violet" className="edit-form__select-label"></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--color-blue">
                            <input type="radio" className="edit-form__select-radio" name="color" id="blue" value="BLUE" onChange={(event) => {if(event.target.checked) handleColorChange(event)}}/>
                            <label htmlFor="blue" className="edit-form__select-label"></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--color-green">
                            <input type="radio" className="edit-form__select-radio" name="color" id="green" value="GREEN" onChange={(event) => {if(event.target.checked) handleColorChange(event)}}/>
                            <label htmlFor="green" className="edit-form__select-label"></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--color-yellow">
                            <input type="radio" className="edit-form__select-radio" name="color" id="yellow" value="YELLOW" onChange={(event) => {if(event.target.checked) handleColorChange(event)}}/>
                            <label htmlFor="yellow" className="edit-form__select-label"></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--color-red">
                            <input type="radio" className="edit-form__select-radio" name="color" id="red" value="RED" onChange={(event) => {if(event.target.checked) handleColorChange(event)}}/>
                            <label htmlFor="red" className="edit-form__select-label"></label>
                        </li>
                    </ul>
                </div>
                <div className="edit-form__select">
                    <label className="edit-form__select-title" aria-label="List icon">List icon</label>
                    <ul className="edit-form__select-items" aria-labelledby="List icon">
                        <li className="edit-form__select-item edit-form__select-item--icon-default">
                            <input type="radio" className="edit-form__select-radio" name="icon" id="default-icon" value="DEFAULT" onChange={(event) => {if(event.target.checked) handleIconChange(event)}}/>
                            <label htmlFor="default-icon"></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--icon-lines">
                            <input type="radio" className="edit-form__select-radio" name="icon" id="lines" value="LINES" onChange={(event) => {if(event.target.checked) handleIconChange(event)}}/>
                            <label htmlFor="lines"></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--icon-sheet">
                            <input type="radio" className="edit-form__select-radio" name="icon" id="sheet" value="SHEET" onChange={(event) => {if(event.target.checked) handleIconChange(event)}}/>
                            <label htmlFor="sheet"></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--icon-folder">
                            <input type="radio" className="edit-form__select-radio" name="icon" id="folder" value="FOLDER" onChange={(event) => {if(event.target.checked) handleIconChange(event)}}/>
                            <label htmlFor="folder"></label>
                        </li>
                    </ul>
                </div>
                <div className="edit-form__buttons-wrapper">
                    <button className="edit-form__button edit-form__button--transparent button" onClick={(event) => {
                            event.preventDefault()
                            props.setActiveCreateForm(false)
                        }}>Cancel</button>
                    <button className="edit-form__button button button--inverse" onClick={(event) => {
                            event.preventDefault()
                            if(!createList()) {
                                console.log('error create list(create list form)')
                            }
                        }}>Add</button>
                </div>
            </form>
        </div>
    )
}