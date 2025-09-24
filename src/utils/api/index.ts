import axios from 'axios';
import { baseURL } from '../constants';
import { ApiError } from '../types/DTO/http-errors-interface';
import { errorHandler, networkErrorStrategy } from './http-error-strategies';
import {
    Mobile,
    UserSession,
} from '@/app/(auth)/signup/_schemas/mobile.schema';
import { VerifyDTO } from '@/app/(auth)/verify/_schemas/verify.schema';
import { getSession } from '@/app/(auth)/_actions/auth.action';
import { UserRes } from '../types/DTO/user.interface';

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
        const session = await getSession();

        if (session) {
            config.headers.authorization = `Bearer ${session?.token}`;
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
    verifyMobile: (data: VerifyDTO): Promise<UserSession> =>
        httpService.post('/verify/mobile', data),
    // sendOtpEmail: (data: Email): Promise<void> =>
    //     httpService.post('/send/otp/email', data),
    // verifyEmail: (data: OTPEmail): Promise<UserSession> =>
    //     httpService.post('/verify/email', data),
    // verifyMobileForForgot: (data: OTP): Promise<ForgotRes> =>
    //     httpService.post('/verify/mobile', data),
    // register: (data: Signup): Promise<UserSession> =>
    //     httpService.post('/register', data),
    // login: (data: Login): Promise<UserSession> =>
    //     httpService.post('/login', data),
    getMe: (): Promise<UserRes> => httpService.get('/dashboard'),
    // logout: (): Promise<void> => httpService.get('/logout'),
};
const api = {
    auth,
};

export default api;
