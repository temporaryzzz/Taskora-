//import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import '../styles.scss';


function SingInForm() {
    const navigate = useNavigate()

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        navigate('profile', {replace: false})//Для рендиринга этого компонента по url '/main'
    };

    return (
        <>
           <h1>TASKORA</h1>
            <form id="singin-form" action='/profile' data-js-singin 
                onSubmit={handleSubmit} >
                <p className="field">
                    <label className="field__label" htmlFor="login">Username or email address</label>
                    <input
                    className="field__control" 
                    id="login" 
                    name="login" 
                    minLength={2}
                    maxLength={16}
                    aria-errormessage="login-errors"
                    data-login
                    required/>

                    <span className="field__errors" id="login-errors" data-js-singin-field-errors></span>
                </p>
                <p className="field">
                    <label className="field__label" htmlFor="password">Password</label>
                    <input 
                    className="field__control" 
                    id="password" 
                    name="password" 
                    type="password" 
                    minLength={4}
                    maxLength={16}
                    pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
                    title="Пароль должен содержать хотя бы 1 заглавную и 1 строчную букву, a также хотя бы 1 цифру."
                    aria-errormessage="password-errors"
                    data-password
                    required/>

                    <span className="field__errors" id="password-errors" data-js-singin-field-errors></span>
                </p>

                <button className="main-button main-button--green" type="submit" >Sing-in</button>
            </form>
            
        </>
    );
}

export default SingInForm;