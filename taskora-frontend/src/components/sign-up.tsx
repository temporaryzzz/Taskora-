import { useContext, useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { SERVER_ADDRES } from '../api';
import '../styles/main.scss'
import { StateContext } from '../App';

function SignUp() {
	const navigate = useNavigate();
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');
	const state = useContext(StateContext)

	if(state?.logIn == true) {
		navigate('main', {replace: true})
	}

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			fetch(`${SERVER_ADDRES}/auth/signup`, {
				method: 'POST',
				headers: { 
					'Content-Type': 'application/json'
				 },
				credentials: 'include',
				body: JSON.stringify({ username: username, email: email, password: password }),
			})
				.then((response) => {
					if (response.ok) {
						navigate('../', { replace: false });
					} else {
						throw new Error(`Ошибка! Статус: ${response.status}`);
					}
				})
				.catch((error) => {
					console.log(error);
				});
		} catch (error) {
			console.error('Ошибка:', error);
		}
	};

	return (
		<div className="center">
			<h1 className='logo-title icon icon--logo'>Taskora~</h1>
			<form id="singup-form" action="" className="form" onSubmit={handleSubmit}>
				<div className="form__inputs-wrapper form__inputs-wrapper--wide">
					<input
						className="form__input"
						placeholder='username'
						id="username"
						name="username"
						onChange={(event) => setUsername(event.target.value)}
						minLength={2}
						maxLength={18}
						pattern="[^@]+"
						title="Username должен иметь длину от 4 до 18 символов и не может содержать @"
						aria-errormessage="username-errors"
						data-username
						required/>

					<span
						className="imput__errors"
						id="username-errors"
						data-js-singin-input-errors></span>

					<input
						className="form__input"
						placeholder='email@'
						id="email"
						name="email"
						onChange={(event) => setEmail(event.target.value)}
						minLength={6}
						pattern=".*@.*"
						title="email должен содержать @"
						aria-errormessage="email-errors"
						data-email
						required
					/>

					<span
						className="input__errors"
						id="email-errors"
						data-js-singin-input-errors></span>

					<input
						className="form__input"
						placeholder='password'
						id="password"
						name="password"
						type="password"
						onChange={(event) => setPassword(event.target.value)}
						minLength={4}
						maxLength={16}
						pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
						title="Пароль должен содержать хотя бы 1 заглавную и 1 строчную букву, a также хотя бы 1 цифру."
						aria-errormessage="password-errors"
						data-password
						required
					/>

					<span
						className="input__errors"
						id="password-errors"
						data-js-singin-input-errors></span>

					<input
						className="form__input"
						placeholder='repeat password'
						id="password"
						name="password"
						type="password"
						onChange={(event) => setPassword(event.target.value)}
						minLength={4}
						maxLength={16}
						pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{4,16}"
						title="Пароль должен содержать хотя бы 1 заглавную и 1 строчную букву, a также хотя бы 1 цифру."
						aria-errormessage="password-errors"
						data-password
						required
					/>

					<span
						className="input__errors"
						id="password-errors"
						data-js-singin-input-errors></span>
				</div>

				<div className="form__buttons-wrapper">
					<button className="button" type="submit">
						Continue
					</button>

					<a className="button button--inverse" href='/'>
						Back
					</a>
				</div>
			</form>
		</div>
	);
}

export default SignUp