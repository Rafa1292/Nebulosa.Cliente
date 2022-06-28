import React from 'react';
import cloud from '@logos/cloud.png';
import '@styles/SendEmail.scss';

const SendEmail = () => {
	return (
		<div className="SendEmail">
			<div className="form-container">
				<h1 className="title my-2">El correo ha sido enviado</h1>
				<strong className="subtitle-email">Por favor revise su bandeja de entrada y siga las instrucciones.</strong>
				<div className="email-image">
					<img alt="email" src={cloud}/>
				</div>
				<button className="primary-button login-button">Login</button>
				<p className="resend">
					<span className='m-1'>No recibió el correo?</span>
					<a href="/password-recovery">Reenviar</a>
				</p>
			</div>
		</div>
	);
}

export default SendEmail;
