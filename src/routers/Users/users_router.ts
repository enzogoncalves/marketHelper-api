import { PrismaClient } from "@prisma/client";
import z, { any } from 'zod';
import { UserSchema } from "../../../prisma/generated/zod/index.js";
import { FastifyTypedInstance, APIGeneralResponseSchema } from "../../utils/types.js";
import { usersController } from "./users_controller.js";

const prisma = new PrismaClient()

const createUserSchema = z.object({
	email: z.string().email(),
	password: z.string()
})

export type CreateUserInput = z.infer<typeof createUserSchema>

const getUserSchema = z.object({
	userId: z.string()
})

export type getUserInput = z.infer<typeof getUserSchema>

export async function usersRouter(app: FastifyTypedInstance) {
	app.post('/', {
		schema: {
			tags: ['users'],
			description: 'Register a new user',
			body: createUserSchema,
			response: {
				201: APIGeneralResponseSchema,
				401: APIGeneralResponseSchema,
				500: APIGeneralResponseSchema,
			}
		}
	},  usersController.register)

	app.get('/', {
		schema: {
			tags: ['users'],
			description: 'List users',
			response: {200: z.array(UserSchema.omit({passwordResetToken: true, password: true, }))}
		}
	}, async (req, reply) => {
		const users = await prisma.user.findMany({	
			select: {
				uid: true,
				email: true,
				updated_at: true,
				created_at: true,
			}
		})

		reply.code(200).send(users)
	})

	app.get('/:userId', {
			preHandler: [app.authenticate],
			schema: {
				tags: ['user'],
				description: 'Get user data',	
			}
		}, usersController.getUser)

	// app.post('/delete', {
	// 	schema: {
	// 		tags: ['app'],
	// 		description: 'Delete all the database data'
	// 	}
	// }, async (req, reply) => {
	// 	await prisma.user.deleteMany({})
	// 	await prisma.authToken.deleteMany({})
	// 	await prisma.task.deleteMany({})
	// 	await prisma.marketList.deleteMany({})
	// 	await prisma.marketListItem.deleteMany({})
		
	// 	reply.send('all deleted')
	// })
}