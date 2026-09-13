import { prisma } from "../lib/prisma";

export const professionalRepository = {
    findByUserId (userId: string) {
        return prisma.professional.findUnique({ where: { userId } })
    },
    findById (id: string) {
        return prisma.professional.findUnique({ where: { id } })
    },
    findByServiceName (serviceName: string) {
        return prisma.professional.findMany({ where: { serviceName: serviceName } })
    },
    create (data: { userId: string; serviceName: string; location: string; description?: string }) {
        return prisma.professional.create({ data })
    },
    delete (userId: string) {
        return prisma.professional.delete({ where: { userId } })
    }
}