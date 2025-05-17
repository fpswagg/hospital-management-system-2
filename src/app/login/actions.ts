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

    if (!formData.get('admin_password'))
        throw new Error('No admin password entered!');

    const res = await fetch(
        `/api/check_admin?pass=${encodeURIComponent(formData.get('admin_password') as string)}`
    );
    const { success, message } = (await res.json()) as {
        success: boolean;
        message: string;
    };

    if (success) {
        const {
            error,
            data: { user },
        } = await supabase.auth.signUp({
            email: formData.get('email') as string,
            password: formData.get('password') as string,
            options: {
                emailRedirectTo: `/confirmed_email`,
            },
        });

        if (error) throw error;

        return user;
    } else throw new Error(message);
}
