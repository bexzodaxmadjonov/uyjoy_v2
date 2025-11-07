// app/api/auth/telegram/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Validate environment variables
if (!BOT_TOKEN) {
    console.error('❌ TELEGRAM_BOT_TOKEN is not set');
}
if (!supabaseUrl) {
    console.error('❌ NEXT_PUBLIC_SUPABASE_URL is not set');
}
if (!supabaseServiceKey) {
    console.error('❌ SUPABASE_SERVICE_ROLE_KEY is not set');
}

const supabase = createClient(supabaseUrl!, supabaseServiceKey!);

// Verify Telegram authentication data
function verifyTelegramAuth(authData: any): boolean {
    if (!BOT_TOKEN) {
        console.error('❌ BOT_TOKEN is not set');
        return false;
    }

    console.log('🔐 Verifying auth data...');
    console.log('📝 Auth data keys:', Object.keys(authData).sort());

    const secret = crypto.createHash('sha256').update(BOT_TOKEN).digest();
    const checkString = Object.keys(authData)
        .filter(key => key !== 'hash')
        .sort()
        .map(key => `${key}=${authData[key]}`)
        .join('\n');

    console.log('📝 Check string:', checkString);

    const hmac = crypto.createHmac('sha256', secret).update(checkString).digest('hex');
    const receivedHash = authData.hash;

    console.log('🔑 Calculated hash:', hmac);
    console.log('🔑 Received hash:', receivedHash);
    console.log('✅ Hashes match:', hmac === receivedHash);

    return hmac === receivedHash;
}

export async function POST(request: NextRequest) {
    console.log('🔵 Telegram auth API called');

    try {
        const body = await request.json();
        console.log('📦 Received data:', {
            id: body.id,
            first_name: body.first_name,
            has_hash: !!body.hash
        });

        const { id, first_name, last_name, username, photo_url, auth_date, hash } = body;

        // Verify the authentication data
        if (!verifyTelegramAuth(body)) {
            console.error('❌ Telegram auth verification failed');
            return NextResponse.json(
                { error: 'Invalid authentication data' },
                { status: 401 }
            );
        }
        console.log('✅ Telegram auth verified');

        // Check if auth is not too old (within 24 hours)
        const authTime = parseInt(auth_date);
        const currentTime = Math.floor(Date.now() / 1000);
        if (currentTime - authTime > 86400) {
            console.error('❌ Auth expired');
            return NextResponse.json(
                { error: 'Authentication expired' },
                { status: 401 }
            );
        }

        console.log('🔍 Checking if user exists with telegram_id:', id);

        // Check if user exists in Supabase by telegram_id
        const { data: existingUser, error: fetchError } = await supabase
            .from('users')
            .select('*')
            .eq('telegram_id', id)
            .maybeSingle();

        if (fetchError) {
            console.error('❌ Error fetching user:', fetchError);
            return NextResponse.json(
                { error: `Database error: ${fetchError.message}` },
                { status: 500 }
            );
        }

        let user;
        const fullName = `${first_name}${last_name ? ' ' + last_name : ''}`;

        if (existingUser) {
            console.log('✅ User exists, updating:', existingUser.id);

            // Update existing user
            const { data: updatedUser, error: updateError } = await supabase
                .from('users')
                .update({
                    name: fullName,
                    image: photo_url,
                    updated_at: new Date().toISOString(),
                })
                .eq('telegram_id', id)
                .select()
                .single();

            if (updateError) {
                console.error('❌ Error updating user:', updateError);
                return NextResponse.json(
                    { error: `Failed to update user: ${updateError.message}` },
                    { status: 500 }
                );
            }
            user = updatedUser;
            console.log('✅ User updated successfully');
        } else {
            console.log('🆕 Creating new user');

            // Create new user - default as renter
            const { data: newUser, error: createError } = await supabase
                .from('users')
                .insert({
                    telegram_id: id,
                    name: fullName,
                    image: photo_url,
                    is_renter: true,
                    is_host: false,
                    is_admin: false,
                    verified: false,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                })
                .select()
                .single();

            if (createError) {
                console.error('❌ Error creating user:', createError);
                console.error('Full error details:', JSON.stringify(createError, null, 2));
                return NextResponse.json(
                    { error: `Failed to create user: ${createError.message}` },
                    { status: 500 }
                );
            }
            user = newUser;
            console.log('✅ User created successfully:', user.id);
        }

        // Generate session token
        const sessionToken = crypto.randomBytes(32).toString('hex');
        const expiresAt = new Date();
        expiresAt.setDate(expiresAt.getDate() + 7); // 7 days

        console.log('🔐 Creating session');

        // Create session in Supabase
        const { data: session, error: sessionError } = await supabase
            .from('sessions')
            .insert({
                user_id: user.id,
                token: sessionToken,
                expires_at: expiresAt.toISOString(),
                created_at: new Date().toISOString(),
                last_activity: new Date().toISOString(),
            })
            .select()
            .single();

        if (sessionError) {
            console.error('❌ Error creating session:', sessionError);
            return NextResponse.json(
                { error: `Failed to create session: ${sessionError.message}` },
                { status: 500 }
            );
        }

        console.log('✅ Session created successfully');

        // Create response with user data
        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                telegramId: user.telegram_id,
                name: user.name,
                email: user.email,
                image: user.image,
                isRenter: user.is_renter,
                isHost: user.is_host,
                isAdmin: user.is_admin,
                verified: user.verified,
                rating: user.rating,
            },
            token: sessionToken,
        });

        // Set HTTP-only cookie for security
        response.cookies.set('auth_token', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7, // 7 days
            path: '/',
        });

        console.log('✅ Auth successful, returning response');
        return response;

    } catch (error) {
        console.error('❌ Telegram auth error:', error);
        return NextResponse.json(
            { error: error instanceof Error ? error.message : 'Authentication failed' },
            { status: 500 }
        );
    }
}