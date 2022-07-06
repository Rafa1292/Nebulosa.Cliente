import React, { useRef, useContext } from 'react';
import { useHistory } from "react-router-dom"
import useAPI from '../hooks/useAPI';
import AppContext from '../context/AppContext';
import '@styles/PasswordRecovery.scss';


const PasswordRecovery = () => {
	const { usePost } = useAPI();
	const { addError } = useContext(AppContext);
	const email = useRef("");
	const history = useHistory();

	const handleSubmit = async () => {
		const response = await usePost('EnviarCorreoDeRecuperacion', { address: email.current.value });
		if (!response.error) {
			history.push("/send-email");
		}
		else {
			var message = response?.error ? response.mensaje : "No hay conexion con el servidor";
			addError(message);
		}

	}
	return (
		<div className="PasswordRecovery">
			<div className="PasswordRecovery-container">
				<h1 className="title">Recuperar contraseña</h1>
				<p className="col-10 my-2" style={{ textAlign: 'center' }}>Por favor ingrese el correo con el que creo la cuenta</p>
				<input ref={email} type="text" id="email" className="input my-2 input-email" />
				<input type="button" onClick={handleSubmit} value="Recuperar" className="btn my-2" />
			</div>
		</div>
	);
}

export default PasswordRecovery;
