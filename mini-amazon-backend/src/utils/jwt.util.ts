import jwt from 'jsonwebtoken'
import type { UserI } from '../types/user.interface.js'

const JWT_SecretKey = process.env.JWT_SECRET || 'somethingsupersecret';

export function generateToken(user: UserI): string {
    const payload = {
        email: user.email,
        role: user.role
    }

    return jwt.sign(payload, JWT_SecretKey, { expiresIn: '1h' });
}