import { FastifyReply, FastifyRequest } from "fastify";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient()

export const userController = {
	user: async (req: FastifyRequest, reply: FastifyReply) => {
		const { user_id } = req.headers;

		console.log('aqui')
		console.log(user_id)
		
		await prisma.user.findFirst({
			where: {
				uid: user_id as string
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