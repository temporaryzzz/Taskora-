import { useEffect, useRef, type FormEvent } from "react";
import { useNavigate } from 'react-router';
import { SERVER_ADDRES, FRONTEND_ADDRES } from "../api";
import '../styles/main.scss'
import { getCookie, setCookie } from "../cookies";

function SignIn() {
    const navigate = useNavigate();
	const usernameInput = useRef<HTMLInputElement>(null);
	const passwordInput = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if(!!(getCookie('token'))) {
            navigate('main', {replace: true})
        }
    }, [])
    
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
			fetch(`${SERVER_ADDRES}/auth/signin`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': `${FRONTEND_ADDRES}`, },
				body: JSON.stringify({ login: username, password: password }),
			})
				.then((response) => {
					if (!response.ok) {
						throw new Error(`Ошибка! Статус: ${response.clone().status}`);
					}
					return response.json();
				})
				.then((data) => {
					setCookie("token", `Bearer ${data.authorization}`)
                    console.log(data.authorization)
					navigate('main', { replace: true });
				})
				.catch((error) => {
					console.log(error);
				});
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
                        maxLength={50}
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
                    <button className="button" onClick={() => navigate('sign-up')}>
                        Registration
                    </button>
                </div>
            </form>
        </div>
	);
}

export default SignIn