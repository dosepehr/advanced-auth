import { ApiError } from '@/utils/types/DTO/http-errors-interface';
import {
    useMutation,
    UseMutationOptions,
    UseMutationResult,
} from '@tanstack/react-query';

// Generic types:
// T - input type
// V - return type
// E - error type (defaults to ApiError)
interface UseCustomMutationOptions<V, T, E = ApiError>
    extends Omit<UseMutationOptions<T, E, V>, 'mutationFn'> {
    mutationFn: (variables: V) => Promise<T>;
}

function useCustomMutation<V, T, E = ApiError>({
    mutationFn,
    ...otherConfig
}: UseCustomMutationOptions<V, T, E>): UseMutationResult<T, E, V> {
    const result = useMutation<T, E, V>({
        mutationFn,
        ...otherConfig,
    });

    return result;
}

export default useCustomMutation;
