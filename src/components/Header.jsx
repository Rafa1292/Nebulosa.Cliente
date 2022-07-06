import React, { useState, useContext, useEffect } from 'react';
import '@styles/Header.scss';
import AppContext from '../context/AppContext';
import { Link } from "react-router-dom";
import dotMenu from '@icons/dotMenu.png';
import cloud from '@logos/cloud.png';
import user from '@icons/user.png';
import exit from '@icons/exit.png';
import { useHistory } from "react-router-dom"

const Header = () => {
	const history = useHistory();
	const [openStyle, setOpenStyle] = useState(false);
	const [openStyleClass, setOpenStyleClass] = useState({});
	const { state, resetAuthState } = useContext(AppContext);
	const [openMenu, setOpenMenu] = useState(false);
	const [openMenuClass, setOpenMenuClass] = useState('');
	const [openHambMenuClass, setOpenHambMenuClass] = useState('');

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

	const Logout = async () => {
		localStorage.removeItem('token');
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
		<nav className='z-10 items-center d-flex'>
			<img onClick={() => HandleMenu(!openMenu)} src={dotMenu} height='44' alt="menu" className={`menu hamb-menu-close ${openHambMenuClass}`} />
			<div className="navbar-left">
				<Link to='/'>
					<img src={cloud} alt="logo" className="nav-logo" />
				</Link>
				<ul className={openMenuClass} style={{ overflowY: 'auto' }}>
					<li onClick={() => HandleMenu(false)}>
					</li>
					<li className='center' style={{ textAlign: 'center' }}>
						<Link to='/Categories'>
							Categorias de producto
						</Link>
					</li>

				</ul>
			</div>
			<div className="navbar-right">
				<ul>
					{!state.auth.user &&
							<Link to="/login">
							<img className='auth' src={user} height='45' style={{ opacity: '0.7' }} />
							</Link>
						||
						<>
							<Link to="/" onClick={Logout}>
								<img className='auth' src={exit} height='50' style={{ opacity: '0.7' }} />
							</Link>
						</>
					}
				</ul>
			</div>
		</nav>
	);
}

export default Header;
