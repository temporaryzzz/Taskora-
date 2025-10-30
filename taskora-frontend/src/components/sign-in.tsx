import { useContext, useRef, type Dispatch, type FormEvent, type SetStateAction, } from "react";
import { useNavigate } from 'react-router';
import { SERVER_ADDRES, FRONTEND_ADDRES } from "../api";
import { TaskManagerContext } from "../App";
import type { User } from "../interfaces";
import '../styles/main.scss'

function SignIn() {
    const navigate = useNavigate();
	const usernameInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);
    const taskManagerContext = useContext(TaskManagerContext)

    let setUser: Dispatch<SetStateAction<User | undefined>>
    if(taskManagerContext)
        setUser = taskManagerContext?.actions.setUser
    
	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		let username = undefined;
		let password = undefined;

		if (usernameInput.current) {
			username = usernameInput.current.value;
		} else {
			console.log('error usernameInput');
			return;
		}

		if (passwordInput.current) {
			password = passwordInput.current.value;
		} else {
			console.log('error passwordInput');
			return;
		}

        try {
			if (/@/.test(username)) {
				fetch(`${SERVER_ADDRES}/auth/signin`, {
					method: 'POST',
					headers: { 
						'Access-Control-Allow-Origin': `${FRONTEND_ADDRES}`,
						'Content-Type': 'application/json'
					 },
					body: JSON.stringify({ email: username, password: password }),
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error(`Ошибка! Статус: ${response.clone().status}`);
						}
						return response.json();
					})
					.then((data) => {
						setUser({ username: data.username, id: data.id, email: data.email });
						navigate('main', { replace: false });
					})
					.catch((error) => {
						console.log(error);
					});
			} else {
				fetch(`${SERVER_ADDRES}/auth/signin`, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({ username: username, password: password }),
				})
					.then((response) => {
						if (!response.ok) {
							throw new Error(`Ошибка! Статус: ${response.clone().status}`);
						}
						return response.json();
					})
					.then((data) => {
						setUser({ username: data.username, id: data.id, email: data.email });
						navigate('main', { replace: false });
					})
					.catch((error) => {
						console.log(error);
					});
			}
		} catch (error) {
			console.error('Ошибка:', error);
		}
    }

	return (
        <div className="center">
            <h1 className="logo-title icon icon--logo">Taskora~</h1>
            <form id="sing-in-form" action="" className="form" onSubmit={handleSubmit}>
                <h2>Authorization</h2>
                <div className="form__inputs-wrapper form__inputs-wrapper--wide">
                    <input type="text" 
                        placeholder="login"
                        className="form__input" 
                        id="login"
                        name="login"
                        minLength={2}
                        maxLength={16}
                        aria-errormessage="login-errors"
                        data-login
                        required
                        ref={usernameInput}/>

                    <input
                    placeholder="password"
                        className="form__input form__input"
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
                        ref={passwordInput}
                    />
                </div>

                <div className="form__buttons-wrapper">
                    <button className="button button--inverse" type="submit">
                        Sign-in
                    </button>
                    <a href="/sign-up" className="button">
                        Registration
                    </a>
                </div>
            </form>
        </div>
	);
}

export default SignIn