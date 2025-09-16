//import { useState } from 'react';
import { useRef, type FormEvent, type SetStateAction} from 'react';
import { useNavigate } from 'react-router';
import type { User } from '../App';
import '../styles.scss';


function SingInForm({setUser} : {setUser: React.Dispatch<SetStateAction<User | undefined>>}) {
    const navigate = useNavigate()
    const usernameInput = useRef<HTMLInputElement>(null)
    const passwordInput = useRef<HTMLInputElement>(null)

    const handleSubmit = (event: FormEvent) => {
        event.preventDefault()
        let username = undefined
        let password = undefined

        if(usernameInput.current) {
            username = usernameInput.current.value
        }
        else{
            console.log('error usernameInput')
            return
        }

        if(passwordInput.current){
            password = passwordInput.current.value
        }
        else{
            console.log('error passwordInput')
            return
        }

        try {
            if((/@/.test(username))) {
                fetch("/api/auth/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "email": username,
                        "password": password
                    })})
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`Ошибка! Статус: ${response.status}`)
                        }
                        console.log("data:", response.json(), "код: ", response.status)
                        return response.json()
                    })
                    .then((data: User) => {
                        setUser({
                            username: data.username,
                            user_id: data.user_id,
                            email: data.email
                        })
                        navigate('profile', {replace: false})
                    })
                    .catch((error) => {
                            console.log(error)
                    });
            } 
            else {
                fetch("/api/auth/signin", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        "username": username,
                        "password": password
                    })})
                    .then((response) => {
                        if (!response.ok) {
                            throw new Error(`Ошибка! Статус: ${response.status}`)
                        }
                        console.log("data:", response.json(), "код: ", response.status)
                        return response.json()
                    })
                    .then((data: User) => {
                        setUser({
                            username: data.username,
                            user_id: data.user_id,
                            email: data.email
                        })
                        navigate('profile', {replace: false})
                    })
                    .catch((error) => {
                            console.log(error)
                    });
            }
        }
        catch (error) {
            console.error('Ошибка:', error);
        }
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
                    required
                    ref={usernameInput}/>

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
                    required
                    ref={passwordInput}/>

                    <span className="field__errors" id="password-errors" data-js-singin-field-errors></span>
                </p>

                <button className="main-button main-button--green" type="submit" >Sing-in</button>
            </form>
            <form>
                <p>No account?</p>
                <button className="main-button" type="submit" formAction={"sing-up"}>Sing-up</button>
            </form>
        </>
    );
}

export default SingInForm;