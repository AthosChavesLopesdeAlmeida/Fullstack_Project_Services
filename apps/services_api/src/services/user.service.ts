import { userRepository } from "../repositories/user.repository";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

const JWT_SECRET = process.env.JWT_SECRET!

enum Role {
    CLIENT = 'CLIENT',
    PROFESSIONAL = 'PROFESSIONAL'
}


export const userService = {
    async register (name: string, email: string, password: string, avatarUrl: string, role: Role) {
        const existing = await userRepository.findByEmail(email)
        if(existing) throw new Error('Email already registered')

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await userRepository.create({email, name, password: hashedPassword, avatarUrl, role})

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '14d' })
        return { user: {id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl, role: user.role}, token }
    },

    async login (email: string, password: string) {
        const user = await userRepository.findByEmail(email)
        if (!user) throw new Error('Invalid credentials')

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) throw new Error('Invalid credentials')

        const token = jwt.sign({ userId: user.id, role: user.role }, JWT_SECRET, { expiresIn: '14d' })
        return { user: {id: user.id, name: user.name, email: user.email, avatarUrl: user.avatarUrl, role: user.role}, token }
    },

    async delete (id: string, password: string) {
        const user = await userRepository.findById(id)
        if (!user) throw new Error('Invalid credentials')

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) throw new Error('Invalid credentials')

        await userRepository.delete(id)
    },
}