'use client';

import {
    createContext,
    useContext,
    useState,
    useEffect,
    type ReactNode,
} from 'react';
import { createClient } from '~/utils/supabase/client';
import type { Session, SupabaseClient, User } from '@supabase/supabase-js';

const supabase = createClient();

interface AuthContextType {
    user: User | null;
    session: Session | null;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    supabase: SupabaseClient<any, 'public', any>;
}

export const AuthContext = createContext<AuthContextType>({
    user: null,
    session: null,
    supabase,
});

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const getSession = async () => {
            const { data } = await supabase.auth.getSession();
            setSession(data.session);
            setUser(data.session?.user ?? null);
        };

        void getSession();

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session);
            setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
    }, []);

    return (
        <AuthContext.Provider value={{ user, session, supabase }}>
            {children}
        </AuthContext.Provider>
    );
}

export const AuthData = () => useContext(AuthContext);
