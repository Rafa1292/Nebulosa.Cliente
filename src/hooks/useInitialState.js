import { useState } from "react";

const initialState = {
	errors: [],
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
			if (token) {
				setState({
					...state,
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
		setState({
			...state,
			auth: initialState.auth
		});
	}

	const removeError = (id)=>{
		setState({
			...state,
			errors: state.errors.filter(err => err.id != id)
		})	}

	const addError = (desc) => {
		setState({
			...state,
			errors: [
				...state.errors,
				{
					description: desc,
					id: createUUID()
				}
			]
		})
	}

	function createUUID(){
		var dt = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
			var r = (dt + Math.random()*16)%16 | 0;
			dt = Math.floor(dt/16);
			return (c=='x' ? r :(r&0x3|0x8)).toString(16);
		});
		return uuid;
	}

	return {
		state,
		setRole,
		resetAuthState,
		addError,
		removeError
	}
}

export default useInitialState;
