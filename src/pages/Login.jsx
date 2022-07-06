import React, { useRef, useContext, useState } from 'react';
import useAPI from '../hooks/useAPI';
import Title from '@components/Title'
import AppContext from '../context/AppContext';
import { useHistory } from "react-router-dom"
import { Link } from "react-router-dom";

const Login = () => {
    const { usePost } = useAPI();
    const { setRole, addError, state } = useContext(AppContext);
    const password = useRef('');
    const email = useRef('');
    const history = useHistory();

    const handleLogin = async () => {
        const hash = password.current.value;
        const user =
        {
            Correo: email.current.value,
            Contraseña: hash
        };
        const response = await usePost('Login', user);
        if (!response.error) {
            localStorage.removeItem('token');
            localStorage.setItem('token', response?.contenido);
            await setRole();
            history.push('/');
        }
        else {
            var message = response?.error ? response.mensaje : "No hay conexion con el servidor";
            addError(message);
        }
    }

    return (
        <>
            {!state.auth.user &&
                <>
                    <div className='col-md-4 flex-wrap items-center center content-center' style={{ padding: '60px 60px', boxShadow: "0px 0px 10px 3px rgb(0 0 0 / 10%)" }}>
                        <Title title='Iniciar sesion' />
                        <div className="col-10 center my-1">
                            <input className='input col-10' ref={email} type='email' placeholder='Email' />
                        </div>
                        <div className="col-10 my-1 center">
                            <input className='input col-10' type='password' ref={password} placeholder='Contraseña' />
                        </div>
                        <div className="col-10 center my-1">
                            <button onClick={handleLogin} type='button' className='col-10 btn py-2 success' placeholder='Iniciar sesion'>
                                Iniciar sesion
                            </button>
                        </div>
                        <Link to="/password-recovery" className='col-10 py-2 center '>
                            <strong className='col-10 center p-1' style={{textAlign: 'center'}}>¿Olvidó su contraseña?</strong>
                        </Link>

                        <div className='col-10 p-0 ' style={{ marginTop: '2rem', borderTop: '1px solid rgba(0,0,0,.2)' }}>
                            <strong className='col-10 center py-2 ' style={{textAlign: 'center'}}>¿No está registrado?</strong>
                            <div className="col-10 center">
                                <Link to="/signup" className='col-10 py-2 center btn '>
                                    Registrarse
                                </Link>
                            </div>
                        </div>
                    </div>
                </>
                ||
                <>
                    <span>Bienvenido</span>
                </>
            }
        </>
    );
}

export default Login;