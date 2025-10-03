
import { PrismaClient } from "@prisma/client";
import bcrypt from 'bcrypt';
import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserInput, getUserInput } from "./users_router";
import { APIGeneralResponseSchema, APIGeneralResponseType } from "../../utils/types";

const prisma = new PrismaClient({
	log: ['query', 'info', 'warn', 'error']
});

export const usersController = {
	register: async (req: FastifyRequest<{Body: CreateUserInput, Reply: any}>, reply: FastifyReply<{Reply: {201: APIGeneralResponseType, 401: APIGeneralResponseType, 500: APIGeneralResponseType}}>) => {
		const { email, password } = req.body

		console.log(`email: ${email}, password: ${password}`)

		const user = await prisma.user.findUnique({
			where: {
				email: email
			}
		})

		if(user) {
			return reply.code(401).send(
				{
					message: 'You cannot register with this email, it is already in use',
					success: false,
					data: null,
					error: {
						statusCode: 'USER_ALREADY_EXISTS',
						type: 'User Registration Error'
					}
				}
			)
		}

		try {
			const passwordSalt = await bcrypt.genSalt()
			const hashedPassword = await bcrypt.hash(password, passwordSalt)
		
			await prisma.user.create({
				data: {
					email,
					password: hashedPassword,
					updated_at: new Date(),
				}
			}).then((user) => {
				if(user) {
					return reply.status(201).send({
						message: 'User created successfully',
						success: true,
						data: null,
					})
				}
			}).catch((e) => {
				return reply.status(500).send(
					{
						message: 'An error occurred while trying to register the user. Please try again later.',
						success: false,
						data: null,
						error: {
							statusCode: 'SERVER_ERROR',
							type: 'User Registration Error'
						}
				}
				)	
			})
		} catch(e) {
			return reply.code(500).send(
				{
					message: 'An error occurred while trying to register the user. Please try again later.',
					success: false,
					data: null,
					error: {
						statusCode: 'SERVER_ERROR',
						type: 'User Registration Error'
					}
				}
			)
		}
	},

	getUser: async (req: FastifyRequest<{Params: getUserInput}>, reply: FastifyReply) => {
		const { userId } = req.params;

		console.log('aqui')
		console.log(userId)
		
		await prisma.user.findFirst({
			where: {
				uid: userId as string
			}, select: {
				uid: true,
				email: true,
			}
		})
		.then((user) => {
			if(!user) {
				return reply.status(500).send('User not found')
			}

			console.log('aqui2')

			console.log(user)

			return reply.status(200).send(user)
		})
		.catch((e) => {
			console.log(e)
			return reply.status(500).send('Something went wrong. Try Again!')
		})
	}
}