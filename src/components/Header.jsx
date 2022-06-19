import React, { useState, useContext, useEffect } from 'react';
import '@styles/Header.scss';
import logo from '@logos/desatados.png';
import AppContext from '../context/AppContext';
import { Link } from "react-router-dom";
import close from '@icons/close.png';
import dotMenu from '@icons/dotMenu.png';
import { useHistory } from "react-router-dom"

const Header = () => {
	const history = useHistory();
	const [openStyle, setOpenStyle] = useState(false);
	const [openStyleClass, setOpenStyleClass] = useState({});
	const { state, resetAuthState } = useContext(AppContext);
	const [openMenu, setOpenMenu] = useState(false);
	const [openMenuClass, setOpenMenuClass] = useState('');
	const [openHambMenuClass, setOpenHambMenuClass] = useState('');
	const handleToggle = () => {
		setToggle(!toggle);
	}

	const HandleMenu = (state) => {
		setOpenMenu(state);
		if (state) {
			setOpenMenuClass('open-menu');
			setOpenHambMenuClass('hamb-menu-open');
		}
		else {
			setOpenMenuClass('');
			setOpenHambMenuClass('');
		}
	}

	const HandleCart = (state) => {
		setOpenStyle(state);
		if (state) {
			setOpenStyleClass({ right: 0 });
		}
		else {
			setOpenStyleClass({});
		}
	}

	const Logout = async () => {
		localStorage.removeItem('token');
		document.cookie = 'token=0';
		HandleMenu(false);
		resetAuthState();
		history.push('/');
	}

	const getUser = async () => {
		try {
			var cookies = document.cookie;
			cookies = cookies.split(';')
			for (const cookie of cookies) {
				if (cookie.includes('token')) {
					const token = cookie.split('=')[1];
					if (token != 0) {
						localStorage.setItem('token', token);
					}
				}
			}
		} catch (error) {

		}

	}
	useEffect(async () => {
		await getUser();
	}, []);

	return (
		<nav className='z-10 items-center'>
			<img src={dotMenu} height='44' alt="menu" className={`menu hamb-menu-close ${openHambMenuClass}`} onClick={() => HandleMenu(!openMenu)} />
			<div className="navbar-left">
				<Link to='/'>
					<img alt="logo" className="nav-logo" />
				</Link>
				<ul className={openMenuClass} style={{ overflowY: 'auto' }}>
					<li onClick={() => HandleMenu(false)}>
						{state.auth.user &&
							<div className='col-10 flex-wrap center'>
								<small className='center' style={{ textAlign: 'center' }}>
									<strong className="col-10 center">
										Bienvenido
									</strong>
									<em className="col-10 center">
										{state.auth.user.substring(0, state.auth.user.indexOf('@'))}
									</em>
								</small>
								<small style={{ color: 'darkblue' }} onClick={() => Logout()} className='p-1 hover'>
									Salir
								</small>
							</div>
							||
							<Link to="/login">Login</Link>
						}
					</li>
					{state.auth.role == 'admin' &&
						<>

						</>
					}
					<li className='secondary center' >
					</li>
				</ul>
			</div>
			<div className="navbar-right">
				<ul>
					<li className="navbar-email" onClick={handleToggle}>
						Hola Rafa!
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default Header;
