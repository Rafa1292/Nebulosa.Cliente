import axios from 'axios';

const api = `https://localhost:7236/`;

const useGetList = async (route) => {
    const list = await useCustom(route, 'get', {});

    return list;
};

const usePost = async (route, data) => {
    try {
        const response = await useCustom(route, 'post', data);
        return response;        
    } catch (error) {
        
    }
}

const useDelete = async (route) => {
    const response = await useCustom(route, 'delete', {});
    return response;
}

const useGet = async (route) => {
    try {
        const object = await useCustom(route, 'get', {});
        return object;
        
    } catch (error) {
        
    }
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
            data: data,

        });

        return response;

    } catch (error) {
        console.log(error)
    }
}

export { useGetList, usePost, useDelete, useGet, useCustom, usePatch };