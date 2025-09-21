import axios from 'axios';
import { baseURL } from '../constants';
import { ApiError } from '../types/DTO/http-errors-interface';
import { errorHandler, networkErrorStrategy } from './http-error-strategies';
import { SignInDTO } from '@/app/(auth)/signin/_schemas/signin.schema';

const httpService = axios.create({
    baseURL,
    headers: {
        'Content-Type': 'multipart/form-data',
    },
});

httpService.interceptors.response.use(
    (response) => {
        return response.data.data;
    },
    (error) => {
        if (error?.response) {
            const statusCode = error?.response?.status;
            if (statusCode >= 400) {
                const errorData: ApiError = error.response?.data;
                console.log(error);
                errorHandler[statusCode](errorData);
            }
        } else {
            networkErrorStrategy();
        }
    }
);
httpService.interceptors.request.use(
    (config) => {
        const token = '';
        if (token) {
            config.headers.authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const auth = {
    signin: (data: SignInDTO): Promise<void> =>
        httpService.post('/identity/signin', data),
};
const api = { auth };

export default api;
