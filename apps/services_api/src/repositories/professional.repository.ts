import { prisma } from "../lib/prisma";

export const professionalRepository = {
    findById (userId: string) {
        return prisma.professional.findUnique({ where: { userId: userId } })
    },
    findByServiceName (serviceName: string) {
        return prisma.professional.findMany({ where: { serviceName: serviceName } })
    },
    create (data: { userId: string; serviceName: string; location: string; description: string }) {
        return prisma.professional.create({ data })
    },
    delete (id: string, userId: string) {
        return prisma.professional.delete({ where: { id: id, userId: userId } })
    }
}