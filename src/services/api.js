import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: "http://35.154.12.200:3000/v1",
    headers: {
        "x-api-key": "AV_ghfhdfsshgndcljdjsflsdfljuy575itjkshkjoujoiuhjdjkjkjshskkjkjhsjkhjkhjkshkj",
    },
});

console.log(process.env.REACT_APP_API_URI)

axiosInstance.interceptors.request.use(
    function configuration(config) {
        const token = localStorage.getItem("ACCESS_TOKEN");
        if (token) config.headers.authorization = `Bearer ${token}`;
        return config;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export const GET = async (url, params) => {
    try {
        let result = await axiosInstance.get(url, { params: params });
        return result;
    } catch (error) {
        return error?.response;
    }
};

export const POST = async (url, body, options) => {
    try {
        let result = await axiosInstance.post(url, body, options);
        return result;
    } catch (error) {
        return error?.response;
    }
};

export const PUT = async (url, body, options) => {
    try {
        let result = await axiosInstance.put(url, body, options);
        return result;
    } catch (error) {
        return error?.response;
    }
};

export const DELETE = async (url, params, data) => {
    try {
        let result = await axiosInstance.delete(url, { params, data });
        return result;
    } catch (error) {
        return error?.response;
    }
};