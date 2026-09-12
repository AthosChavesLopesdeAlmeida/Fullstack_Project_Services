import { prisma } from "../lib/prisma";

enum Role {
    CLIENT = 'CLIENT',
    PROFESSIONAL = 'PROFESSIONAL'
}

export const userRepository = {
    findById (id: string) {
        return prisma.user.findUnique({ where: { id } })
    },
    findByEmail (email: string) {
        return prisma.user.findUnique({ where: { email } })
    },
    // This function below serves the purpose of searching users in the interface
    // Whereas the two above serve for authenticating at the process of logging in or creating account
    findByName (name: string) {
        return prisma.user.findMany({ where: { name } })
    },
    create (data: { name: string; email: string; password: string; avatarUrl: string; role: Role }) {
        return prisma.user.create({ data })
    },
    delete (id: string) {
        return prisma.user.delete({ where: { id } })
    }
}