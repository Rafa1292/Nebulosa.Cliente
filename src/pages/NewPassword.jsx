import React, { useRef, useState, useContext } from 'react';
import useAPI from '../hooks/useAPI';
import '@styles/NewPassword.scss';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom"
import AppContext from '../context/AppContext';

const NewPassword = () => {
	const { setRole, addError } = useContext(AppContext);

	const { usePost } = useAPI();
	const { token } = useParams();
	const password = useRef("");
	const repeatPassword = useRef("");
	const mail = useRef("");
	const [message, setMessage] = useState("");
	const history = useHistory();

	const handleSubmit = async () => {
		const data = {
			token: token,
			nuevaContraseña: password.current.value,
			correo: mail.current.value
		}
		if (repeatPassword.current.value === password.current.value) {
			const response = await usePost("RecupereLaContraseña", data)
			console.log(response)
			if (!response.error) {
				history.push('/Login');
			}
			else {
				var message = response?.error ? response.mensaje : "No hay conexion con el servidor";
				addError(message);
			}
		}

	}
	return (
		<div className="NewPassword p-1">
			<div className="center">
				<h1 className="title col-10 text-center">Crear nueva contraseña</h1>
				<p className="subtitle-newpassword my-1 col-10">Introduzca la nueva contraseña y el correo</p>
				<span className='col-10 text-center' style={{ color: 'red' }}>{message}</span>
				<div className="col-10 center my-1">
					<input ref={mail} type="text" id="mail" placeholder="Correo" className="input input-email  col-md-4 m-1" />
				</div>
				<div className="col-10 center my-1">
					<input ref={password} type="password" id="password" placeholder="Contraseña" className="input col-md-4 m-1 input-password" />
				</div>
				<div className="col-10 center my-1">
					<input ref={repeatPassword} type="password" id="new-password" placeholder="Repetir contraseña" className="col-md-4 input m-1 input-password" />
				</div>
				<input onClick={handleSubmit} type="submit" value="Confirmar" className="btn my-2" />
			</div>
		</div>
	);
}

export default NewPassword;
