'use client';

import { createClient } from '~/utils/supabase/client';

export async function login(formData: FormData) {
    const supabase = createClient();

    const {
        error,
        data: { user },
    } = await supabase.auth.signInWithPassword({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    if (error) throw error;

    return user;
}

export async function signup(formData: FormData) {
    const supabase = createClient();

    const {
        error,
        data: { user },
    } = await supabase.auth.signUp({
        email: formData.get('email') as string,
        password: formData.get('password') as string,
    });

    if (error) throw error;

    return user;
}
