// app/api/auth/phone/send-code/route.ts
import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import crypto from 'crypto';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

const supabase = createClient(supabaseUrl, supabaseServiceKey);

export async function POST(request: NextRequest) {
    try {
        const { phone } = await request.json();

        // Validate phone number format (Uzbekistan: +998XXXXXXXXX)
        const phoneRegex = /^\+998\d{9}$/;
        if (!phoneRegex.test(phone)) {
            return NextResponse.json(
                { error: 'Invalid phone number format' },
                { status: 400 }
            );
        }

        // Generate 6-digit verification code
        const code = Math.floor(100000 + Math.random() * 900000).toString();

        // Set expiration time (5 minutes)
        const expiresAt = new Date();
        expiresAt.setMinutes(expiresAt.getMinutes() + 5);

        // Save verification code to database
        const { error: insertError } = await supabase
            .from('phone_verification_codes')
            .insert({
                phone,
                code,
                expires_at: expiresAt.toISOString(),
                verified: false,
                created_at: new Date().toISOString(),
            });

        if (insertError) {
            console.error('Error saving verification code:', insertError);
            throw insertError;
        }

        // TODO: Send SMS via provider (Twilio, Vonage, Eskiz.uz, etc.)
        // Example placeholder for SMS integration:
        /*
        await sendSMS({
          to: phone,
          message: `Your Uyjoy verification code is: ${code}`,
        });
        */

        console.log(`📱 SMS Code for ${phone}: ${code}`); // For development only!

        return NextResponse.json({
            success: true,
            message: 'Verification code sent successfully',
            // TODO: Remove in production! Only for development
            ...(process.env.NODE_ENV === 'development' && { code }),
        });
    } catch (error) {
        console.error('Send code error:', error);
        return NextResponse.json(
            { error: 'Failed to send verification code' },
            { status: 500 }
        );
    }
}

// app/api/auth/phone/verify-code/route.ts
export async function VERIFY_POST(request: NextRequest) {
    try {
        const { phone, code } = await request.json();

        // Validate inputs
        if (!phone || !code) {
            return NextResponse.json(
                { error: 'Phone and code are required' },
                { status: 400 }
            );
        }

        // Find verification code
        const { data: verificationData, error: fetchError } = await supabase
            .from('phone_verification_codes')
            .select('*')
            .eq('phone', phone)
            .eq('code', code)
            .eq('verified', false)
            .order('created_at', { ascending: false })
            .limit(1)
            .single();

        if (fetchError || !verificationData) {
            return NextResponse.json(
                { error: 'Invalid or expired verification code' },
                { status: 401 }
            );
        }

        // Check if code is expired
        const now = new Date();
        const expiresAt = new Date(verificationData.expires_at);
        if (now > expiresAt) {
            return NextResponse.json(
                { error: 'Verification code has expired' },
                { status: 401 }
            );
        }

        // Mark code as verified
        await supabase
            .from('phone_verification_codes')
            .update({ verified: true })
            .eq('id', verificationData.id);

        // Check if user exists
        const { data: existingUser } = await supabase
            .from('users')
            .select('*')
            .eq('phone', phone)
            .single();

        let user;

        if (existingUser) {
            // Update existing user
            const { data: updatedUser, error: updateError } = await supabase
                .from('users')
                .update({
                    updated_at: new Date().toISOString(),
                })
                .eq('phone', phone)
                .select()
                .single();

            if (updateError) throw updateError;
            user = updatedUser;
        } else {
            // Create new user
            const { data: newUser, error: createError } = await supabase
                .from('users')
                .insert({
                    phone,
                    name: phone, // Temporary name, user can update later
                    is_renter: true,
                    is_host: false,
                    is_admin: false,
                    verified: false,
                    created_at: new Date().toISOString(),
                    updated_at: new Date().toISOString(),
                })
                .select()
                .single();

            if (createError) throw createError;
            user = newUser;
        }

        // Generate session token
        const sessionToken = crypto.randomBytes(32).toString('hex');
        const sessionExpiresAt = new Date();
        sessionExpiresAt.setDate(sessionExpiresAt.getDate() + 7);

        // Create session
        await supabase.from('sessions').insert({
            user_id: user.id,
            token: sessionToken,
            expires_at: sessionExpiresAt.toISOString(),
            created_at: new Date().toISOString(),
            last_activity: new Date().toISOString(),
        });

        const response = NextResponse.json({
            success: true,
            user: {
                id: user.id,
                phone: user.phone,
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

        // Set cookie
        response.cookies.set('auth_token', sessionToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 60 * 60 * 24 * 7,
            path: '/',
        });

        return response;
    } catch (error) {
        console.error('Verify code error:', error);
        return NextResponse.json(
            { error: 'Verification failed' },
            { status: 500 }
        );
    }
}