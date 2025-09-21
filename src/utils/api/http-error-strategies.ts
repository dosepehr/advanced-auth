import {
    ApiError,
    BadRequestError,
    NetworkError,
    NotFoundError,
    UnauthorizedError,
    UnhandledException,
    ValidationError,
} from '@/utils/types/DTO/http-errors-interface';

export type ApiErrorHandler = (errorData: ApiError) => void;

export const badRequestErrorStrategy: ApiErrorHandler = (errorData) => {
    throw {
        ...errorData,
    } as BadRequestError;
};

export const validationErrorStrategy: ApiErrorHandler = (errorData) => {
    throw { ...errorData } as ValidationError;
};

export const notFoundErrorStrategy: ApiErrorHandler = (errorData) => {
    throw {
        ...errorData,
        detail: 'Requested service not found',
    } as NotFoundError;
};

export const unauthorizedErrorStrategy: ApiErrorHandler = (errorData) => {
    throw {
        ...errorData,
        detail: 'Please sign up or log in to access this section',
    } as UnauthorizedError;
};

export const unhandledExceptionStrategy: ApiErrorHandler = (errorData) => {
    throw { ...errorData, detail: 'Server error' } as UnhandledException;
};

export const conflictError: ApiErrorHandler = (errorData) => {
    throw {
        ...errorData,
        detail: 'You must wait before sending a new request',
    };
};

export const networkErrorStrategy = () => {
    throw { detail: 'Network error' } as NetworkError;
};

export const errorHandler: Record<number, ApiErrorHandler> = {
    400: (errorData) =>
        (errorData.errors ? validationErrorStrategy : badRequestErrorStrategy)(
            errorData,
        ),
    409: conflictError,
    403: unauthorizedErrorStrategy,
    401: unauthorizedErrorStrategy,
    404: notFoundErrorStrategy,
    422: badRequestErrorStrategy,
    500: unhandledExceptionStrategy,
};