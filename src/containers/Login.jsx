import React, { useRef, useContext } from 'react';
import { usePost } from '../hooks/useAPI';
import facebookIcon from '@icons/facebook.png';
import googleIcon from '@icons/google.png';
import { useHistory } from "react-router-dom"
import AppContext from '../context/AppContext';
import cloud from '@logos/cloud.png';

const Login = () => {
    const email = useRef('');
    const password = useRef('');
    const history = useHistory();
    const { setRole } = useContext(AppContext);

    const handleLogin = async () => {
        const user = {
            username: email.current.value,
            password: password.current.value
        };
        const response = await usePost('auth/login', user);
        if (response.status == 200) {
            localStorage.removeItem('token');
            localStorage.setItem('token', response.data.token);
            await setRole();
            history.push('/');
        }
    }

    const facebook = async () => {
        window.open("http://localhost:3000/api/v1/auth/facebook", "_self");
    }

    const google = async () => {
        window.open("http://localhost:3000/api/v1/auth/google", "_self");
    }

    return (
        <div className='col-sm-4 flex-wrap center content-center' style={{ paddingTop: '15px' }}>
            <button onClick={facebook} type='button' className="col-md-8 items-center btn flex-wrap center m-1" style={{ padding: '0.75rem', background: 'white', color: '#3b5998', border: '1px solid #3b5998', fontWeight: 'bold', borderRadius: '5px' }}>
                <img className='mx-2' src={facebookIcon} width={30} />
                Inicia sesion con facebook
            </button>
            <button onClick={google} type='button' className="col-md-8 flex-wrap items-center btn center m-1" style={{ border: '1px solid lightgray', padding: '0.75rem', background: '#fff', color: 'black', fontWeight: 'bold', borderRadius: '5px' }}>
                <img className='mx-2' src={googleIcon} width={30} />
                Inicia sesion con google
            </button>
            <span className='col-10 center my-1 ' style={{ borderTop: '1px solid rgba(0,0,0,.2)', paddingTop: '2rem' }}>Ó bien</span>
            <div className="col-md-6 center my-1">
                <input className='input col-8' ref={email} placeholder='Email' />
            </div>
            <div className="col-md-6 my-1 center">
                <input className='input col-8' type='password' ref={password} placeholder='Contraseña' />
            </div>
            <div className="col-md-6 center my-1">
                <button onClick={handleLogin} type='button' className='col-8 btn success' placeholder='Iniciar sesion'>
                    Iniciar sesion
                </button>
            </div>
            <small className='col-10 center p-1'>¿Olvidó su contraseña?</small>

            <div className='col-md-6 p-0 ' style={{ marginTop: '2rem', borderTop: '1px solid rgba(0,0,0,.2)' }}>
                <span className='col-10 center py-2 ' >¿No estas registrado?</span>
                <div className="col-10 center">
                    <button type='button' className='col-8 btn ' placeholder='Iniciar sesion'>
                        Registrarse
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Login;