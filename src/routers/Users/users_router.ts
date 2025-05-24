import { PrismaClient } from "@prisma/client";
import z from 'zod';
import { UserSchema } from "../../../prisma/generated/zod";
import { FastifyTypedInstance } from "../../utils/types";
import { usersController } from "./users_controller";
import { authMiddleware } from "../../middlewares/auth";

const prisma = new PrismaClient()

const createUserSchema = z.object({
	name: z.string(),
	email: z.string().email(),
	age: z.number(),
	profile_picture: z.string(),
	password: z.string()
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export async function usersRouter(app: FastifyTypedInstance) {
	app.get('/', {
		preHandler: [authMiddleware],
		schema: {
			tags: ['users'],
			description: 'List users',
			response: {200: z.array(UserSchema.omit({passwordResetToken: true}))}
		}
	}, async (req, reply) => {
		const users = await prisma.user.findMany({	
			select: {
				uid: true,
				name: true,
				age: true,
				email: true,
				profile_picture: true,
				password: true,
				updated_at: true,
				created_at: true,
				authTokenId: true
			}
		})

		reply.code(200).send(users)
	})

	app.post('/', {
		schema: {
			tags: ['users'],
			description: 'Register a new user',
			body: createUserSchema,
			response: {
				201: UserSchema
			}
		}
	},  usersController.register)

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