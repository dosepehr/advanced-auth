import axios from 'axios';
import { baseURL } from '../constants';
import { ApiError } from '../types/DTO/http-errors-interface';
import { errorHandler, networkErrorStrategy } from './http-error-strategies';
import { Mobile, SignupRes } from '@/app/(auth)/signup/_schemas/mobile.schema';
import { VerifyDTO } from '@/app/(auth)/verify/_schemas/verify.schema';

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

const auth = {
    sendOtp: (data: Mobile): Promise<void> =>
        httpService.post('/send/otp', data),
    verifyMobile: (data: VerifyDTO): Promise<SignupRes> =>
        httpService.post('/verify/mobile', data),
    // sendOtpEmail: (data: Email): Promise<void> =>
    //     httpService.post('/send/otp/email', data),
    // verifyEmail: (data: OTPEmail): Promise<SignupRes> =>
    //     httpService.post('/verify/email', data),
    // verifyMobileForForgot: (data: OTP): Promise<ForgotRes> =>
    //     httpService.post('/verify/mobile', data),
    // register: (data: Signup): Promise<SignupRes> =>
    //     httpService.post('/register', data),
    // login: (data: Login): Promise<SignupRes> =>
    //     httpService.post('/login', data),
    // getMe: (): Promise<UserRes> => httpService.get('/dashboard'),
    // logout: (): Promise<void> => httpService.get('/logout'),
};
const api = {
    auth,
};

export default api;
