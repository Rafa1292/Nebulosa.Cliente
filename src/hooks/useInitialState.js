import { useState, useContext } from "react";
import axios from 'axios';
import AppContext from '@context/AppContext';

const api = `https://localhost:7236/`;
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

	const removeError = (id) => {
		setState({
			...state,
			errors: state.errors.filter(err => err.id != id)
		})
	}

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

	function createUUID() {
		var dt = new Date().getTime();
		var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
			var r = (dt + Math.random() * 16) % 16 | 0;
			dt = Math.floor(dt / 16);
			return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
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

const useAPI = () => {
    const { addError } = useContext(AppContext);
	const useGetList = async (route) => {
		const list = await useCustom(route, 'get', {});
		return list;
	};

	const usePost = async (route, data) => {
		const response = await useCustom(route, 'post', data);
		return response;
	}

	const useDelete = async (route) => {
		const response = await useCustom(route, 'delete', {});
		return response;
	}

	const useGet = async (route) => {
		const object = await useCustom(route, 'get', {});
		return object;
	};

	const usePatch = async (route, data) => {
		const response = await useCustom(route, 'put', data);
		return response;
	}

	const useCustom = async (route, method, data) => {
		try {
			const token = localStorage.getItem('token');
			const response = await axios({
				headers: {
					Authorization: `Bearer ${token}`
				},
				method: method,
				url: `${api}${route}`,
				data: data
			});
			if (!response?.data?.error) {
				return response.data
			}
			else {
				var message = response?.data?.error ? response.data.mensaje : "No hay conexion con el servidor";
				addError(message);
				return {
					error: true,
					mensaje: message,
					contenido: []
				}
			}
		} catch (error) {
			console.log(error)
			return {
				error: true,
				mensaje: "Lo sentimos algo ha salido mal",
				contenido: []
			}
		}
	}

	return {
		useGetList,
		usePost,
		useGet,
		useDelete,
		usePatch
	}
}

export { useInitialState, useAPI };
