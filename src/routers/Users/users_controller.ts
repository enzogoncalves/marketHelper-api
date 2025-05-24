
import { FastifyReply, FastifyRequest } from "fastify";
import { Prisma, PrismaClient } from "@prisma/client";
import { CreateUserInput } from "./users_router";
import { addHours } from "date-fns";
import { SignJWT } from "jose"
import bcrypt from 'bcrypt'

const prisma = new PrismaClient();

export const usersController = {
	register: async (req: FastifyRequest<{Body: CreateUserInput}>, reply: FastifyReply) => {
		const { name, email, age, profile_picture, password } = req.body

		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		})

		if(user) {
			return reply.code(401).send({
				message: 'User already exists with this email'
			})
		}

		try {
			const passwordSalt = await bcrypt.genSalt()
			const hashedPassword = await bcrypt.hash(password, passwordSalt)
		
			const user = await prisma.user.create({
				data: {
					name,
					age,
					email,
					profile_picture,
					password: hashedPassword,
					updated_at: new Date(),
				},
				select: {
					uid: true,
					name: true,
					age: true,
					email: true,
					profile_picture: true,
					password: true,
					updated_at: true,
					created_at: true
				}
			})
		} catch(e) {
			return reply.code(500).send(e)
		}
	}
}