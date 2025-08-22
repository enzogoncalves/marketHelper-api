import { PrismaClient } from "@prisma/client";
import z, { any } from 'zod';
import { UserSchema } from "../../../prisma/generated/zod";
import { authMiddleware } from "../../middlewares/auth";
import { FastifyTypedInstance, APIGeneralResponseSchema } from "../../utils/types";
import { usersController } from "./users_controller";

const prisma = new PrismaClient()

const createUserSchema = z.object({
	email: z.string().email(),
	password: z.string()
})

export type CreateUserInput = z.infer<typeof createUserSchema>

export async function usersRouter(app: FastifyTypedInstance) {
	app.get('/', {
		preHandler: [authMiddleware],
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