import { useState } from 'react';
import type { FormEvent } from 'react';
import { useNavigate } from 'react-router';
import { SERVER_ADDRES } from '../api';
import '../styles/main.scss'

function SignUp() {
	const navigate = useNavigate();
	const [username, setUsername] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const handleSubmit = async (event: FormEvent) => {
		event.preventDefault();

		try {
			fetch(`${SERVER_ADDRES}/auth/signup`, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
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
		<>
			<h1>TASKORA</h1>
			<form id="singup-form" action="" data-js-singin onSubmit={handleSubmit}>
				<p className="field">
					<label className="field__label" htmlFor="username">
						Username
					</label>
					<input
						className="field__control"
						id="username"
						name="username"
						onChange={(event) => setUsername(event.target.value)}
						minLength={2}
						maxLength={18}
						pattern="[^@]+"
						title="Username должен иметь длину от 4 до 18 символов и не может содержать @"
						aria-errormessage="username-errors"
						data-username
						required
					/>

					<span
						className="field__errors"
						id="username-errors"
						data-js-singin-field-errors></span>
				</p>

				<p className="field">
					<label className="field__label" htmlFor="email">
						Email address
					</label>
					<input
						className="field__control"
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
						className="field__errors"
						id="email-errors"
						data-js-singin-field-errors></span>
				</p>

				<p className="field">
					<label className="field__label" htmlFor="password">
						Password
					</label>
					<input
						className="field__control"
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
						className="field__errors"
						id="password-errors"
						data-js-singin-field-errors></span>
				</p>

				<p className="field">
					<label className="field__label" htmlFor="password">
						Repeat password
					</label>
					<input
						className="field__control"
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
						className="field__errors"
						id="password-errors"
						data-js-singin-field-errors></span>
				</p>

				<button className="main-button main-button--green" type="submit">
					Sing-Up
				</button>
			</form>

			<form>
				<button className="main-button main-button--back" onClick={() => navigate('../')}>
					Назад
				</button>
			</form>
		</>
	);
}

export default SignUp