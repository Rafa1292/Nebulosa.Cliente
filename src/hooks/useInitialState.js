import { useState } from "react";
import { useGet } from '../hooks/useAPI';

const initialState = {
	auth: {
		role: 'customer',
		sub: 0,
		user: null
	}
}

const useInitialState = () => {
	const [state, setState] = useState(initialState);

	const setRole = async () => {
		try {
			const token = localStorage.getItem('token');
			console.log(token)
			if (token) {
				console.log('si')
				setState({
					...state,
					customerId: 1,
					auth: {
						user: 'Rafa',
						role: 'Admin',
						sub: 1
					}
				})
			}

		} catch (error) {
		}
	}

	const resetAuthState = () => {
		setState(initialState);
	}

	return {
		state,
		setRole,
		resetAuthState
	}
}

export default useInitialState;
