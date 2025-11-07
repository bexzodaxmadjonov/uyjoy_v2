// app/api/auth/me/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';

export async function GET(request: NextRequest) {
    try {
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        return NextResponse.json({ user });
    } catch (error) {
        console.error('Get user error:', error);
        return NextResponse.json(
            { error: 'Failed to get user' },
            { status: 500 }
        );
    }
}

// app/api/auth/logout/route.ts
export async function POST_LOGOUT() {
    try {
        const { logout } = await import('@/lib/auth');
        await logout();

        const response = NextResponse.json({ success: true });
        response.cookies.delete('auth_token');

        return response;
    } catch (error) {
        console.error('Logout error:', error);
        return NextResponse.json(
            { error: 'Logout failed' },
            { status: 500 }
        );
    }
}

// app/api/auth/toggle-role/route.ts
export async function POST_TOGGLE_ROLE(request: NextRequest) {
    try {
        const { getCurrentUser, toggleUserRole } = await import('@/lib/auth');
        const user = await getCurrentUser();

        if (!user) {
            return NextResponse.json(
                { error: 'Not authenticated' },
                { status: 401 }
            );
        }

        const { role } = await request.json();

        if (role !== 'renter' && role !== 'host') {
            return NextResponse.json(
                { error: 'Invalid role' },
                { status: 400 }
            );
        }

        // Toggle the role
        const currentValue = role === 'renter' ? user.isRenter : user.isHost;
        await toggleUserRole(user.id, role, !currentValue);

        return NextResponse.json({
            success: true,
            [role]: !currentValue,
        });
    } catch (error) {
        console.error('Toggle role error:', error);
        return NextResponse.json(
            { error: 'Failed to toggle role' },
            { status: 500 }
        );
    }
}