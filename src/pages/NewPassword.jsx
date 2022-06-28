import React, { useRef, useState } from 'react';
import { usePost } from '../hooks/useAPI';
import '@styles/NewPassword.scss';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from "react-router-dom"

const NewPassword = () => {
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
			if (response?.status === 200) {
				history.push('/Login');
			}
		}
		else {
			setMessage("Las contraseñas deben ser iguales");
		}
	}
	return (
		<div className="NewPassword">
			<div className="center">
				<h1 className="title col-10 text-center">Crear nueva contraseña</h1>
				<p className="subtitle-newpassword my-1 col-10">Introuzca la nueva contraseña y el correo</p>
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
