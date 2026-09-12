import { Request, Response, NextFunction } from 'express';

enum Role {
    CLIENT = 'CLIENT',
    PROFESSIONAL = 'PROFESSIONAL'
}

export interface AuthRequest extends Request {
  userId?: string;
  role?: Role;
}

export function roleMiddleware(role: Role) {
    return (req: AuthRequest, res: Response, next: NextFunction) => {
        if (req.role) {
            return res.status(403).json({ error: 'Forbidden' })
        }
        return next()
    }
}