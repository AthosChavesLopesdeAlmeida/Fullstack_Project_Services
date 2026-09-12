import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

enum Role {
    CLIENT = 'CLIENT',
    PROFESSIONAL = 'PROFESSIONAL'
}

export interface AuthRequest extends Request {
  userId?: string;
  role?: Role;
}

export function authMiddleware (req: AuthRequest, res: Response, next: NextFunction) {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ error: 'Not authenticated'})
    }

    try {
        const payload = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string, role: Role };
        req.role = payload.role
        req.userId = payload.userId
        return next()
    } catch {
        return res.status(401).json({ error: 'Invalid token' })
    }
}