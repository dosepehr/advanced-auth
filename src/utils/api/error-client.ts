// client/utils/error-strategy-client.ts
'use client';

import { toast } from 'sonner';
import { Problem } from '@/utils/types/DTO/http-errors-interface';

export function handleProblem(problem: Problem) {
    switch (problem.status) {
        case 400:
            toast.error(problem.message ?? 'Bad request');
            break;
        case 401:
        case 403:
            toast.error('Please sign up or log in to access this section');
            break;
        case 404:
            toast.error('Requested service not found');
            break;
        case 409:
            toast.error('You must wait before sending a new request');
            break;
        case 500:
            toast.error('Server error');
            break;
        default:
            toast.error(problem.message ?? 'Unexpected error');
    }
}
