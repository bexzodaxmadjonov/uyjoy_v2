// types/index.ts

export interface User {
    id: string;
    telegramId?: number;
    phone?: string;
    name: string;
    email?: string;
    image?: string;
    isRenter: boolean;
    isHost: boolean;
    isAdmin: boolean;
    verified: boolean; // hosting verification
    rating?: number;
    createdAt: string;
    updatedAt: string;
}

export type ListingType = 'short_term' | 'long_term';

export interface Listing {
    id: string;
    ownerId: string;
    title: string;
    description?: string;
    type: ListingType;
    location: string;
    price: number;
    images: string[];
    amenities: string[];
    verified: boolean;
    rating?: number;
    createdAt: string;
    updatedAt: string;
}

export type BookingStatus = 'pending' | 'confirmed' | 'completed' | 'cancelled';
export type PaymentStatus = 'unpaid' | 'paid' | 'refunded';

export interface Booking {
    id: string;
    listingId: string;
    userId: string;
    startDate: string;
    endDate: string;
    status: BookingStatus;
    paymentStatus: PaymentStatus;
    totalPrice: number;
    createdAt: string;
    updatedAt: string;
}

export interface Review {
    id: string;
    userId: string;
    listingId: string;
    rating: number; // 1-5
    comment?: string;
    createdAt: string;
}

export interface Notification {
    id: string;
    userId: string;
    title: string;
    message: string;
    read: boolean;
    createdAt: string;
}

export interface Session {
    id: string;
    userId: string;
    token: string;
    expiresAt: string;
    createdAt: string;
    lastActivity: string;
}

export interface PhoneVerificationCode {
    id: string;
    phone: string;
    code: string;
    expiresAt: string;
    verified: boolean;
    createdAt: string;
}

// Telegram Auth Types
export interface TelegramUser {
    id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    photo_url?: string;
    auth_date: number;
    hash: string;
}

// API Response Types
export interface AuthResponse {
    success: boolean;
    user: User;
    token: string;
}

export interface ErrorResponse {
    error: string;
}

// Database row types (snake_case from Supabase)
export interface UserRow {
    id: string;
    telegram_id?: number;
    phone?: string;
    name: string;
    email?: string;
    image?: string;
    is_renter: boolean;
    is_host: boolean;
    is_admin: boolean;
    verified: boolean;
    rating?: number;
    created_at: string;
    updated_at: string;
}

export interface ListingRow {
    id: string;
    owner_id: string;
    title: string;
    description?: string;
    type: ListingType;
    location: string;
    price: number;
    images: string[];
    amenities: string[];
    verified: boolean;
    rating?: number;
    created_at: string;
    updated_at: string;
}

export interface BookingRow {
    id: string;
    listing_id: string;
    user_id: string;
    start_date: string;
    end_date: string;
    status: BookingStatus;
    payment_status: PaymentStatus;
    total_price: number;
    created_at: string;
    updated_at: string;
}

// Helper function to convert database rows to frontend types
export function userRowToUser(row: UserRow): User {
    return {
        id: row.id,
        telegramId: row.telegram_id,
        phone: row.phone,
        name: row.name,
        email: row.email,
        image: row.image,
        isRenter: row.is_renter,
        isHost: row.is_host,
        isAdmin: row.is_admin,
        verified: row.verified,
        rating: row.rating,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export function listingRowToListing(row: ListingRow): Listing {
    return {
        id: row.id,
        ownerId: row.owner_id,
        title: row.title,
        description: row.description,
        type: row.type,
        location: row.location,
        price: row.price,
        images: row.images,
        amenities: row.amenities,
        verified: row.verified,
        rating: row.rating,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}

export function bookingRowToBooking(row: BookingRow): Booking {
    return {
        id: row.id,
        listingId: row.listing_id,
        userId: row.user_id,
        startDate: row.start_date,
        endDate: row.end_date,
        status: row.status,
        paymentStatus: row.payment_status,
        totalPrice: row.total_price,
        createdAt: row.created_at,
        updatedAt: row.updated_at,
    };
}