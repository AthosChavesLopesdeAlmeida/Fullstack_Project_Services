import { Request, Response } from "express";
import { professionalService } from "../services/professional.service";

enum Role {
    CLIENT = 'CLIENT',
    PROFESSIONAL = 'PROFESSIONAL'
}

export interface AuthRequest extends Request {
  userId?: string;
  role?: Role
}


export const professionalController = {
    async create (req: AuthRequest, res: Response) {
        const userId  = req.userId!
        const { serviceName, location, description } = req.body

        try {
            const { professional } = await professionalService.create(userId, serviceName, location, description)
            res.json({ professional: { 
                serviceName: professional.serviceName,
                location: professional.location,
                description: professional.description 
            } })
        } catch {
            res.status(409).json({ error: 'Unable to create professional account' })
        }
    },

    async delete (req: AuthRequest, res: Response) {
        const userId  = req.userId!
        const { id } = req.body

        try {
            await professionalService.delete(id, userId)
            res.status(204).send() 
        } catch {
            res.status(401).json({ error: 'Unable to delete' })
        }
    },

    async findByServiceName (req: Request, res: Response) {
        const { serviceName } = req.body

        try {
            const professionals = await professionalService.findByServiceName(serviceName)
            res.json({ professionals })
        } catch {
            res.status(404).json({ message: 'No professionals found' })
        }
    }
}