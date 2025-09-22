import { create } from 'zustand';
import { UserSession } from '../types/DTO/auth.interface';

type AuthStates = 'loading' | 'authenticated' | 'unauthenticated';

interface SessionState {
    session: UserSession | null;
    status: AuthStates;
    clearSession: () => void;
    updateSession: () => void;
}

const unauthenticatedResponse = {
    session: null,
    status: 'unauthenticated' as AuthStates,
};

const fetchSessionFromAPI = async () => {
    try {
        const response = await fetch('/api/auth/session');
        if (response.ok) {
            const data = await response.json();
            if (data) {
                return {
                    session: data,
                    status: 'authenticated' as AuthStates,
                };
            }
            return unauthenticatedResponse;
        }
        return unauthenticatedResponse;
    } catch (err) {
        return unauthenticatedResponse;
    }
};

export const useSessionStore = create<SessionState>((set) => ({
    session: null,
    status: 'loading' as AuthStates,
    clearSession: () => {
        set(unauthenticatedResponse);
    },
    updateSession: async () => {
        const { session, status } = await fetchSessionFromAPI();
        set({
            session,
            status,
        });
    },
}));

if (typeof window !== 'undefined') {
    useSessionStore.getState().updateSession();
}
