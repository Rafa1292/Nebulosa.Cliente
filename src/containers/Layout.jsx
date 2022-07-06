import React, { useEffect, useContext, useState } from 'react';
import Header from '@components/Header';
import AppContext from '../context/AppContext';
import info from '@icons/info.png';

const Layout = ({ children, errors = [] }) => {
	const { setRole, removeError } = useContext(AppContext);



	useEffect(async () => {
		const token = localStorage.getItem('token');
		if (token) {
			await setRole();
		}
	}, []);

	return (
		<>
			<Header />
				<div className="d-flex col-10 error-container">
					{errors.map((error, i) => (
						<span className={`error-alert`} key={error.id}>
							{error.description}
							<strong onClick={()=>removeError(error.id)} className='error-icon'>
								x
							</strong>
						</span>
					))}
				</div>
			<div className="layout center">
				{children}
			</div>
		</>
	);
}

export default Layout;
