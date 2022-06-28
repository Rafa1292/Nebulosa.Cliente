import React, {useRef} from 'react';
import { usePost } from '../hooks/useAPI';
import { useHistory } from "react-router-dom"
import '@styles/PasswordRecovery.scss';

const PasswordRecovery = () => {
	const email = useRef("");
    const history = useHistory();
	
	const handleSubmit = async () => {
		try {
			const response = await usePost('EnviarCorreoDeRecuperacion', {address: email.current.value});
			if (response?.status == 200)
			{
				history.push("/send-email");
			}
			
		} catch (error) {
			console.log(error)
		}

	}
	return (
		<div className="PasswordRecovery">
			<div className="PasswordRecovery-container">
				<h1 className="title">Recuperar contraseña</h1>
				<p className="col-10 my-2" style={{textAlign: 'center'}}>Por favor ingrese el correo con el que creo la cuenta</p>
					<input ref={email} type="text" id="email" className="input my-2 input-email" />
					<input type="button" onClick={handleSubmit} value="Recuperar" className="btn my-2" />
			</div>
		</div>
	);
}

export default PasswordRecovery;
