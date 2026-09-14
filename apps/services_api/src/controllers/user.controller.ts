import { Request, Response } from "express";
import { userService } from "../services/user.service";

enum Role {
    CLIENT = 'CLIENT',
    PROFESSIONAL = 'PROFESSIONAL'
}

export interface AuthRequest extends Request {
  userId?: string;
  role?: Role
}

export const userController = {
    async register (req: AuthRequest, res: Response) {
        const { name, email, password, avatarUrl, role } = req.body 
        const isProduction = process.env.NODE_ENV === 'production'

        if (!name || !email || !password || !avatarUrl || !role) {
           return res.status(400).json({ error: 'Incomplete data' })
        }

        try {
            const { token, user } = await userService.register(email, name, password, avatarUrl, role)
            res.cookie('token', token, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'none' : 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: '/'
            })

            res.json({ user: { id: user.id, email: user.email }})
        } catch {
            res.status(409).json({ error: 'Invalid credentials' })
        }
    },

    async login (req: Request, res: Response) {
        const { email, password } = req.body
        const isProduction = process.env.NODE_ENV === 'production'

        if (!email || !password) {
           return res.status(400).json({ error: 'Incomplete data' })
        }

        try {
            const { token, user } = await userService.login(email, password)

            res.cookie('token', token, {
                httpOnly: true,
                secure: isProduction,
                sameSite: isProduction ? 'none' : 'lax',
                maxAge: 1000 * 60 * 60 * 24 * 7,
                path: '/'
            })

            res.json({user: { id: user.id, email: user.email }})
        } catch (err) {
            res.status(409).json({ error: 'Invalid credentials' })
        }
    },

    async delete (req: AuthRequest, res: Response) {
        const { password } = req.body
        const userId = req.userId! 

        try {
            await userService.delete(userId, password);

            res.clearCookie('token', { path: '/' });
            res.status(204).send();
        } catch (err) {
            res.status(401).json({ error: 'User not found' })
        }
    },

    async logout (req: Request, res: Response) {
        res.clearCookie('token', { path: '/' });
        res.json({ message: 'Successfully logged out' })
    },

    async findById (req: AuthRequest, res: Response) {
        const userId = req.userId!

        try {
            const user = await userService.findById(userId);
            if (!user) return res.status(404).json({ error: 'User not found' });
            
            return res.json({ 
            user: { id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl, role: user.role } 
            });
        } catch {
            return res.status(500).json({ error: 'Internal server error' });
        }
    },

    async findProfessionalPfpByUserId (req: Request, res: Response) {
        const userId = req.params.userId as string

        try {
            const user = await userService.findById(userId);
            if (!user) return res.status(404).json({ error: 'User not found' });
            
            return res.json({ avatarUrl: user.avatarUrl });
        } catch {
            return res.status(500).json({ error: 'Internal server error' });
        }
    } 
} 