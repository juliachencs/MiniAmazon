import jwt, { type SignOptions } from 'jsonwebtoken'
import type { User } from '../types/user.interface.js'

const JWT_SecretKey = process.env.JWT_SECRET || 'somethingsupersecret';

export function generateToken(user: User): string {
    const payload = {
        id: user.id,
        email: user.email,
        role: user.role
    }

    return jwt.sign(payload, JWT_SecretKey, { expiresIn: '1h' });
}