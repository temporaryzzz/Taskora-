
export function CreateListForm() {
    return(
        <form className="edit-form">
            <input type="text" className="edit-form__input" placeholder="title"/>
            <div className="edit-form__select">
                <label className="edit-form__select-title" aria-label="List color">List color</label>
                <ul className="edit-form__select-items" aria-labelledby="List color">
                    <li className="edit-form__select-item edit-form__select-item--color-none">
                        <input type="radio" className="edit-form__select-radio" name="color" id="none" value="none"/>
                        <label htmlFor="none" className="edit-form__select-label"></label>
                    </li>
                    <li className="edit-form__select-item">
                        <input type="radio" className="edit-form__select-radio" name="color" id="default" value="default"/>
                        <label htmlFor="default" className="edit-form__select-label"></label>
                    </li>
                    <li className="edit-form__select-item edit-form__select-item--color-violet">
                        <input type="radio" className="edit-form__select-radio" name="color" id="violet" value="violet"/>
                        <label htmlFor="violet" className="edit-form__select-label"></label>
                    </li>
                    <li className="edit-form__select-item edit-form__select-item--color-blue">
                        <input type="radio" className="edit-form__select-radio" name="color" id="blue" value="blue"/>
                        <label htmlFor="blue" className="edit-form__select-label"></label>
                    </li>
                    <li className="edit-form__select-item edit-form__select-item--color-green">
                        <input type="radio" className="edit-form__select-radio" name="color" id="green" value="green"/>
                        <label htmlFor="green" className="edit-form__select-label"></label>
                    </li>
                    <li className="edit-form__select-item edit-form__select-item--color-yellow">
                        <input type="radio" className="edit-form__select-radio" name="color" id="yellow" value="yellow"/>
                        <label htmlFor="yellow" className="edit-form__select-label"></label>
                    </li>
                    <li className="edit-form__select-item edit-form__select-item--color-red">
                        <input type="radio" className="edit-form__select-radio" name="color" id="red" value="red"/>
                        <label htmlFor="red" className="edit-form__select-label"></label>
                    </li>
                </ul>
            </div>
            <div className="edit-form__select">
                <label className="edit-form__select-title" aria-label="List icon">List icon</label>
                <ul className="edit-form__select-items" aria-labelledby="List icon">
                    <li className="edit-form__select-item edit-form__select-item--icon-default">
                        <input type="radio" className="edit-form__select-radio" name="icon" id="default-icon" value="default-icon"/>
                        <label htmlFor="default-icon"></label>
                    </li>
                    <li className="edit-form__select-item edit-form__select-item--icon-lines">
                        <input type="radio" className="edit-form__select-radio" name="icon" id="lines" value="lines"/>
                        <label htmlFor="lines"></label>
                    </li>
                    <li className="edit-form__select-item edit-form__select-item--icon-sheet">
                        <input type="radio" className="edit-form__select-radio" name="icon" id="sheet" value="sheet"/>
                        <label htmlFor="sheet"></label>
                    </li>
                    <li className="edit-form__select-item edit-form__select-item--icon-folder">
                        <input type="radio" className="edit-form__select-radio" name="icon" id="folder" value="folder"/>
                        <label htmlFor="folder"></label>
                    </li>
                </ul>
            </div>
            <div className="edit-form__buttons-wrapper">
                <button className="edit-form__button edit-form__button--transparent button">Cancel</button>
                <button className="edit-form__button button button--inverse" type="submit">Add</button>
            </div>
        </form>
    )
}