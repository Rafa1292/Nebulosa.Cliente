import React, {useRef} from 'react';
import '@styles/CreateAccount.scss';
import Title from '@components/Title';
import { usePost } from '../hooks/useAPI';
import { useHistory } from "react-router-dom"

const CreateAccount = () => {
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
        if (response.status == 200) {
            history.push('/Login');
        }
    }
	return (
		<div className="col-md-3 flex-wrap center" style={{padding: '60px 60px', boxShadow: "0px 0px 10px 3px rgb(0 0 0 / 10%)"}}>
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
