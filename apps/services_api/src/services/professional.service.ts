import { professionalRepository } from "../repositories/professional.repository";
import { userRepository } from "../repositories/user.repository";

export const professionalService = {
    async create (userId: string, serviceName: string, location: string, description?: string) {
        const existing = await userRepository.findById(userId)
        if (!existing) throw new Error('User does not exist')

        const professional = await professionalRepository.create({userId, serviceName, location, description})
        return { professional: { 
            serviceName: professional.serviceName,
            location: professional.location,
            description: professional.description 
        } }
    },

    async delete (userId: string) {
        const existingProfessional = await professionalRepository.findByUserId(userId)
        if (!existingProfessional) throw new Error('Professional account does not exist')

        await professionalRepository.delete(userId)
    },

    async findByServiceName (serviceName: string) {
        const professionals = await professionalRepository.findByServiceName(serviceName)

        return { professionals }
    }
}