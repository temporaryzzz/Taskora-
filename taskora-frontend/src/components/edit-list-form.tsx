import { useContext, useEffect, useRef, useState, type SetStateAction } from "react";
import { StateContext, ActionsContext } from "../App";
import type { UpdateListDTO, List } from "../interfaces";

type EditListFormnProps = { 
    list: List,
    activeEditForm: boolean,
    setActiveEditForm: React.Dispatch<SetStateAction<boolean>>,
 };

const stateClasses = {
    active: "not-clickable--active",
}

export function EditListForm(props: EditListFormnProps) {
    const state = useContext(StateContext)
    const actions = useContext(ActionsContext)
    const [title, setTitle] = useState<string>(props.list.title)
    const [color, setColor] = useState<'LIGHT' | 'RED' | 'BLUE' | 'YELLOW' | 'VIOLET' | 'GREEN' | 'NONE'>(props.list.color)
    const [icon, setIcon] = useState<'DEFAULT' | 'INBOX' | 'ALL' | 'TODAY' | 'COMPLETED' | 'BASKET' | 'LINES' | 'SHEET' | 'FOLDER'>(props.list.icon)
    const createFormRef = useRef<HTMLDivElement>(null)

    if(state  == undefined || actions == undefined) {
        return
    }

    const updateList = () => {
        if(/\S/.test(title ?? '') && title != 'Basket' && title != 'Completed' && title != 'All') {
            if(state.user !== undefined) {
                const UpdateListDTO: UpdateListDTO = {title: title, sections: props.list.sections, icon: icon, color: color, viewType: props.list.viewType}
                actions.updateList(props.list.id, UpdateListDTO)
                props.setActiveEditForm(false)
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
            e.target.checked = true
        }
    };

    const handleIconChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value as 'DEFAULT' | 'INBOX' | 'ALL' | 'TODAY' | 'COMPLETED' | 'BASKET' | 'LINES' | 'SHEET' | 'FOLDER';
        if (['DEFAULT', 'INBOX', 'ALL', 'TODAY', 'COMPLETED', 'BASKET', 'LINES', 'SHEET', 'FOLDER'].includes(value)) {
            setIcon(value);
            e.target.checked = true
        }
    };

    const toggleVisible = () => {
        if(!createFormRef.current) {
            return
        }
        if(props.activeEditForm == true) {
            createFormRef.current.classList.add(stateClasses.active)
        }
        else {
            createFormRef.current.classList.remove(stateClasses.active)
        }
    }

    const InitializationRadioButton = () => {
        if(createFormRef.current) {
            const colorRadioButtons = createFormRef.current.querySelectorAll(`input[name="color-${props.list.id}"]`)
            colorRadioButtons.forEach(radioButton => {
                const inputElement = radioButton as HTMLInputElement
                if(inputElement.value === color) {
                    inputElement.checked = true
                }
            })

            const iconRadioButtons = createFormRef.current.querySelectorAll(`input[name="icon-${props.list.id}"]`)
            iconRadioButtons.forEach(radioButton => {
                const inputElement = radioButton as HTMLInputElement
                if(inputElement.value === icon) {
                    inputElement.checked = true
                }
            })
        }
    }

    useEffect(() => {
        InitializationRadioButton()
        toggleVisible()
    }, [props.activeEditForm])

    return(
        <div className="not-clickable" ref={createFormRef}>
            <div className="edit-form pop-up-window">
                <input type="text" className="edit-form__input" placeholder="title" value={title} onChange={(event) => {setTitle(event.target.value)}}/>
                <div className="edit-form__select">
                    <label className="edit-form__select-title" aria-label="List color">List color</label>
                    <ul className="edit-form__select-items" aria-labelledby="List color">
                        <li className="edit-form__select-item edit-form__select-item--color-none">
                            <input type="radio" className="edit-form__select-radio" name={`color-${props.list.id}`} id={`none-${props.list.id}`} value="NONE" onChange={(event) => {handleColorChange(event)}}/>
                            <label htmlFor={`none-${props.list.id}`} className="edit-form__select-label"></label>
                        </li>
                        <li className="edit-form__select-item">
                            <input type="radio" className="edit-form__select-radio" name={`color-${props.list.id}`} id={`light-${props.list.id}`} value="LIGHT" onChange={(event) => {handleColorChange(event)}}/>
                            <label htmlFor={`light-${props.list.id}`} className="edit-form__select-label"></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--color-violet">
                            <input type="radio" className="edit-form__select-radio" name={`color-${props.list.id}`} id={`violet-${props.list.id}`} value="VIOLET" onChange={(event) => {handleColorChange(event)}}/>
                            <label htmlFor={`violet-${props.list.id}`} className="edit-form__select-label"></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--color-blue">
                            <input type="radio" className="edit-form__select-radio" name={`color-${props.list.id}`} id={`blue-${props.list.id}`} value="BLUE" onChange={(event) => {handleColorChange(event)}}/>
                            <label htmlFor={`blue-${props.list.id}`} className="edit-form__select-label"></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--color-green">
                            <input type="radio" className="edit-form__select-radio" name={`color-${props.list.id}`} id={`green-${props.list.id}`} value="GREEN" onChange={(event) => {handleColorChange(event)}}/>
                            <label htmlFor={`green-${props.list.id}`} className="edit-form__select-label"></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--color-yellow">
                            <input type="radio" className="edit-form__select-radio" name={`color-${props.list.id}`} id={`yellow-${props.list.id}`} value="YELLOW" onChange={(event) => {handleColorChange(event)}}/>
                            <label htmlFor={`yellow-${props.list.id}`} className="edit-form__select-label"></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--color-red">
                            <input type="radio" className="edit-form__select-radio" name={`color-${props.list.id}`} id={`red-${props.list.id}`} value="RED" onChange={(event) => {handleColorChange(event)}}/>
                            <label htmlFor={`red-${props.list.id}`} className="edit-form__select-label"></label>
                        </li>
                    </ul>
                </div>
                <div className="edit-form__select">
                    <label className="edit-form__select-title" aria-label="List icon">List icon</label>
                    <ul className="edit-form__select-items" aria-labelledby="List icon">
                        <li className="edit-form__select-item edit-form__select-item--icon-default">
                            <input type="radio" className="edit-form__select-radio" name={`icon-${props.list.id}`} id={`default-icon-${props.list.id}`} value="DEFAULT" onChange={(event) => {handleIconChange(event)}}/>
                            <label htmlFor={`default-icon-${props.list.id}`}></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--icon-lines">
                            <input type="radio" className="edit-form__select-radio" name={`icon-${props.list.id}`} id={`lines-${props.list.id}`} value="LINES" onChange={(event) => {handleIconChange(event)}}/>
                            <label htmlFor={`lines-${props.list.id}`}></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--icon-sheet">
                            <input type="radio" className="edit-form__select-radio" name={`icon-${props.list.id}`} id={`sheet-${props.list.id}`} value="SHEET" onChange={(event) => {handleIconChange(event)}}/>
                            <label htmlFor={`sheet-${props.list.id}`}></label>
                        </li>
                        <li className="edit-form__select-item edit-form__select-item--icon-folder">
                            <input type="radio" className="edit-form__select-radio" name={`icon-${props.list.id}`} id={`folder-${props.list.id}`} value="FOLDER" onChange={(event) => {handleIconChange(event)}}/>
                            <label htmlFor={`folder-${props.list.id}`}></label>
                        </li>
                    </ul>
                </div>
                <div className="edit-form__buttons-wrapper">
                    <button className="edit-form__button edit-form__button--transparent button" onClick={(event) => {
                            event.preventDefault()
                            props.setActiveEditForm(false)
                        }}>Cancel</button>
                    <button className="edit-form__button button button--inverse" onClick={(event) => {
                            event.preventDefault()
                            if(!updateList()) {
                                console.log('error edit list(edit list form)')
                            }
                        }}>Change</button>
                </div>
            </div>
        </div>
    )
}