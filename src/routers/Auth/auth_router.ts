import { PrismaClient } from "@prisma/client";
import z from 'zod';
import { APIGeneralResponseSchema, FastifyTypedInstance } from "../../utils/types.js";
import { authController } from "./auth_controller.js";
import { loginUserSchema, logoutUserSchema, successLoginUserResponse } from "./auth_shema.js";

const prisma = new PrismaClient()

export async function authRouter(app: FastifyTypedInstance) {
	app.post('/login', {
		schema: {
			tags: ['auth'],
			description: 'Login a user',
			body: loginUserSchema,
			response: {
				200: successLoginUserResponse,
				401: APIGeneralResponseSchema
			},
		}
	}, authController.login)

	app.post('/signout', {
		preHandler: [app.authenticate],
		schema: {
			tags: ['auth'],
			body: logoutUserSchema,
			response: {
				200: z.object({
					message: z.string()
				})
			}
		}
	}, authController.signout)

	app.post('/reset-password', {
		// preHandler: [authMiddleware],
		schema: {
			description: 'Reset password (send email to reset the password)',
			tags: ['auth'],
		}
	}, authController.sendPasswordResetLinkInEmail)

	app.post('/delete', {
		schema: {
			tags: ['app'],
			description: 'Delete all the database data'
		}
	}, async (req, reply) => {
		await prisma.authToken.deleteMany({})
		await prisma.user.deleteMany({})
		await prisma.price.deleteMany({})
		await prisma.marketListItem.deleteMany({})
		await prisma.marketList.deleteMany({})
		
		reply.send('all deleted')
	})
}