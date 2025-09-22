import { ApiError } from '@/utils/types/DTO/http-errors-interface';

import {
    QueryKey,
    useQuery,
    UseQueryOptions,
    UseQueryResult,
} from '@tanstack/react-query';

// Generic type T represents the data type returned by the query
// Generic type E represents the error type (optional)
interface UseCustomQueryOptions<T, E = ApiError>
    extends Omit<UseQueryOptions<T, E, T>, 'queryKey' | 'queryFn'> {
    queryKey: QueryKey;
    queryFn: () => Promise<T>;
}

function useCustomQuery<T, E = ApiError>({
    queryKey,
    queryFn,
    ...otherConfig
}: UseCustomQueryOptions<T, E>): UseQueryResult<T, E> {
    const result = useQuery<T, E, T>({
        queryKey,
        queryFn,
        ...otherConfig,
    });

    return result;
}

export default useCustomQuery;
