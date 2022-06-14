import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { fetchOrUpdateLogin } from "../../store/login";

import { selectLoginError, selectIsConnected, selectBaseURL } from "../../store/selectors";

import { useDispatch, useSelector } from "react-redux";

function Login() {
	let navigate = useNavigate();
	const dispatch = useDispatch();

	const baseURL = useSelector(selectBaseURL());
	const loginError = useSelector(selectLoginError());
	const isConnected = useSelector(selectIsConnected());

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	const handleSubmit = async (event) => {
		event.preventDefault();
		dispatch(fetchOrUpdateLogin(baseURL, email, password));
	};

	useEffect(() => {
		if (isConnected && loginError === null) {
			navigate("/profile");
		}
	}, [isConnected, loginError, dispatch, navigate]);

	return (
		<main className="main bg-dark">
			<section className="sign-in-content">
				<i className="fa fa-user-circle sign-in-icon"></i>
				<h1>Sign In</h1>
				<form onSubmit={handleSubmit}>
					<div className="input-wrapper">
						<label htmlFor="username">Username</label>
						<input type="text" id="username" onChange={(e) => setEmail(e.target.value)} />
					</div>
					<div className="input-wrapper">
						<label htmlFor="password">Password</label>
						<input type="password" id="password" onChange={(e) => setPassword(e.target.value)} />
					</div>
					<div className="input-remember">
						<input type="checkbox" id="remember-me" />
						<label htmlFor="remember-me">Remember me</label>
					</div>

					<button type="submit" className="sign-in-button">
						Sign In
					</button>
					{loginError && <div className="input-remember input-error">{loginError.response.data.message}</div>}
				</form>
			</section>
		</main>
	);
}

export default Login;
