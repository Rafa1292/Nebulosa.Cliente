import React from 'react';
import logo from '@logos/404nf.gif'

const NotFound = () => {
	return (
		<div className='col-10 center'>
			<img src={logo} />
			<strong className='col-10 text-center'>
				<h1>
					¿Como has llegado aqui?
				</h1>
			</strong>
			<h2>
				Esta direccion no  existe
			</h2>
		</div>
	);
}

export default NotFound;
