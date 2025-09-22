import axios from 'axios';
import { baseURL } from '../constants';
import { ApiError } from '../types/DTO/http-errors-interface';
import { errorHandler, networkErrorStrategy } from './http-error-strategies';
import { SignInDTO } from '@/app/(auth)/signin/_schemas/signin.schema';
import { UserResponse, logoutDto } from '../types/DTO/auth.interface';
import { getSession } from '@/app/(auth)/signin/_actions/auth.action';
import { CourseListItem } from '../types/DTO/course.inerface';

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
        console.log(error);
        if (error?.response) {
            const statusCode = error?.response?.status;
            console.log('object');
            if (statusCode >= 400) {
                const errorData: ApiError = error.response?.data;
                console.log(error);
                errorHandler[statusCode]?.(errorData);
            }
        } else {
            networkErrorStrategy();
        }
    }
);
httpService.interceptors.request.use(
    async (config) => {
        const token = await getSession();
        if (token) {
            config.headers.authorization = `Bearer ${token?.accessToken}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

const auth = {
    signin: (data: SignInDTO): Promise<UserResponse> =>
        httpService.post('/identity/signin', data),
    logout: (data: logoutDto): Promise<UserResponse> =>
        httpService.post('/identity/signout', data),
};

const courses = {
    all: (): Promise<CourseListItem[]> => httpService.get('/identity/courses'),
};

const api = { auth, courses };

export default api;
