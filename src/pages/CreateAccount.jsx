import React, {useRef, useContext} from 'react';
import AppContext from '../context/AppContext';
import Title from '@components/Title';
import useAPI from '../hooks/useAPI';
import { useHistory } from "react-router-dom"
import '@styles/CreateAccount.scss';

const CreateAccount = () => {
	const { addError } = useContext(AppContext);
	const { usePost } = useAPI();
	const history = useHistory();
    const email = useRef('');
    const name = useRef('');

	const handleRegister = async () => {
		const hash = 'Abcd1234.';
        const user = {
			Nombre: name.current.value,
            Correo: email.current.value,
            Contraseña: hash
        };
        const response = await usePost('Usuario/Agregue', user);
        if (!response.error) {
            history.push('/Login');
        }
		else {
            var message = response?.error ? response.mensaje : "No hay conexion con el servidor";
            addError(message);
        }
    }
	
	return (
		<div className="col-md-3 items-center flex-wrap center" style={{ padding: '60px 60px'}}>
			<Title title='Registrar nuevo usuario' />
			<div className="col-10 py-1 center">
				<input type="text" id="Nombre" ref={name} placeholder="Nombre" className="input col-10" />
			</div>
			<div className="col-10 py-1 center">
				<input type="text" id="Correo" ref={email} placeholder="Correo" className="input col-10" />
			</div>
			<div className="col-10 py-2 my-2 center">
				<input type="submit" value="Agregar" onClick={handleRegister} className="btn py-2 col-md-3" />
			</div>
		</div>
	);
}

export default CreateAccount;
