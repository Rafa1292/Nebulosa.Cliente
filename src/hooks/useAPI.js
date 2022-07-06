import axios from 'axios';

const api = `https://localhost:7236/`;


const useAPI = () => {

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
        const response = await useCustom(route, 'patch', data);
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
                return {
                    error: true,
                    mensaje: message,
                    contenido: []
                }
            }
        } catch (error) {
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

export default useAPI;