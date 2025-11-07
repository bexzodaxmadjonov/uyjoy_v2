// lib/auth.ts
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import { User, UserRow, userRowToUser } from '@/types';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

/**
 * Get current authenticated user from session token
 * Use this in Server Components or API routes
 */
export async function getCurrentUser(): Promise<User | null> {
    try {
        const cookieStore = await cookies();
        const token = cookieStore.get('auth_token')?.value;

        if (!token) {
            return null;
        }

        // Find valid session
        const { data: session, error: sessionError } = await supabase
            .from('sessions')
            .select('user_id, expires_at')
            .eq('token', token)
            .single();

        if (sessionError || !session) {
            return null;
        }

        // Check if session is expired
        const now = new Date();
        const expiresAt = new Date(session.expires_at);
        if (now > expiresAt) {
            // Delete expired session
            await supabase.from('sessions').delete().eq('token', token);
            return null;
        }

        // Update last activity
        await supabase
            .from('sessions')
            .update({ last_activity: new Date().toISOString() })
            .eq('token', token);

        // Get user data
        const { data: userRow, error: userError } = await supabase
            .from('users')
            .select('*')
            .eq('id', session.user_id)
            .single();

        if (userError || !userRow) {
            return null;
        }

        return userRowToUser(userRow as UserRow);
    } catch (error) {
        console.error('Get current user error:', error);
        return null;
    }
}

/**
 * Verify if user has specific role
 */
export async function hasRole(
    role: 'renter' | 'host' | 'admin'
): Promise<boolean> {
    const user = await getCurrentUser();
    if (!user) return false;

    switch (role) {
        case 'renter':
            return user.isRenter;
        case 'host':
            return user.isHost;
        case 'admin':
            return user.isAdmin;
        default:
            return false;
    }
}

/**
 * Require authentication - redirects if not authenticated
 */
export async function requireAuth(): Promise<User> {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Unauthorized');
    }
    return user;
}

/**
 * Require specific role - throws error if user doesn't have role
 */
export async function requireRole(
    role: 'renter' | 'host' | 'admin'
): Promise<User> {
    const user = await requireAuth();

    const hasRequiredRole =
        (role === 'renter' && user.isRenter) ||
        (role === 'host' && user.isHost) ||
        (role === 'admin' && user.isAdmin);

    if (!hasRequiredRole) {
        throw new Error(`Unauthorized: ${role} role required`);
    }

    return user;
}

/**
 * Toggle user role (renter/host)
 */
export async function toggleUserRole(
    userId: string,
    role: 'renter' | 'host',
    value: boolean
): Promise<void> {
    const column = role === 'renter' ? 'is_renter' : 'is_host';

    const { error } = await supabase
        .from('users')
        .update({ [column]: value })
        .eq('id', userId);

    if (error) {
        throw new Error(`Failed to toggle role: ${error.message}`);
    }
}

/**
 * Logout user - delete session and clear cookie
 */
export async function logout(): Promise<void> {
    const cookieStore = await cookies();
    const token = cookieStore.get('auth_token')?.value;

    if (token) {
        await supabase.from('sessions').delete().eq('token', token);
    }

    // Clear the auth cookie
    cookieStore.delete('auth_token');
}

/**
 * Client-side auth helpers
 */
export const clientAuth = {
    /**
     * Get user from client-side
     */
    async getUser(): Promise<User | null> {
        try {
            const response = await fetch('/api/auth/me');
            if (!response.ok) return null;
            const data = await response.json();
            return data.user;
        } catch {
            return null;
        }
    },

    /**
     * Logout from client-side
     */
    async logout(): Promise<void> {
        await fetch('/api/auth/logout', { method: 'POST' });
        window.location.href = '/';
    },

    /**
     * Toggle role from client-side
     */
    async toggleRole(role: 'renter' | 'host'): Promise<boolean> {
        try {
            const response = await fetch('/api/auth/toggle-role', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ role }),
            });
            return response.ok;
        } catch {
            return false;
        }
    },
};