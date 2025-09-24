import axios from 'axios';
import { baseURL } from '../constants';
import { ApiError } from '../types/DTO/http-errors-interface';
import { errorHandler, networkErrorStrategy } from './http-error-strategies';

const httpService = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'application/json',
    },
});

httpService.interceptors.response.use(
    (response) => {
        return response.data;
    },
    (error) => {
        if (error?.response) {
            const statusCode = error?.response?.status;
            if (statusCode >= 400) {
                const errorData: ApiError = error.response?.data;
                console.error(error);
                errorHandler[statusCode]?.(errorData);
            }
        } else {
            networkErrorStrategy();
        }
    }
);
httpService.interceptors.request.use(
    async (config) => {
        const token = {
            accessToken: '',
        };
        if (token) {
            config.headers.authorization = `Bearer ${token?.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


const api = { };

export default api;
