import { professionalRepository } from "../repositories/professional.repository";
import { userRepository } from "../repositories/user.repository";

export const professionalService = {
    async create (userId: string, serviceName: string, location: string, description: string) {
        const existing = userRepository.findById(userId)
        if (!existing) throw new Error('User does not exist')

        const professional = await professionalRepository.create({userId, serviceName, location, description})
        return { professional: { 
            serviceName: professional.serviceName,
            location: professional.location,
            description: professional.description 
        } }
    },

    async delete (id: string, userId: string) {
        const existingUser = userRepository.findById(userId)
        if (!existingUser) throw new Error('User does not exist')   

        const existingProfessional = professionalRepository.findById(id)
        if (!existingProfessional) throw new Error('Professional account does not exist')

        await professionalRepository.delete(id, userId)
    },

    async findByServiceName (serviceName: string) {
        const professionals = await professionalRepository.findByServiceName(serviceName)

        return { professionals }
    }
}