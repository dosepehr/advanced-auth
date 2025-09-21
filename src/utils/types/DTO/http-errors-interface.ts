interface Problem {
    message: string;
    status?: number;
    detail?: string;
    errors?: Record<string, string[]>;
}

interface BadRequestError extends Problem {
    type: 'BadRequest';
}

interface UnauthorizedError extends Problem {
    type: 'Unauthorized';
}

interface ValidationError extends Problem {
    type: 'ValidationError';
}

interface NotFoundError extends Problem {
    type: 'NotFound';
}

interface UnhandledException extends Problem {
    type: 'UnhandledException';
}

interface NetworkError extends Problem {
    type: 'NetworkError';
}

type ApiError =
    | BadRequestError
    | NetworkError
    | NotFoundError
    | UnhandledException
    | UnauthorizedError
    | ValidationError;

export type {
    Problem,
    BadRequestError,
    UnauthorizedError,
    ValidationError,
    NotFoundError,
    UnhandledException,
    NetworkError,
    ApiError,
};
