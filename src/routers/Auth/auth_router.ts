import z from 'zod';
import { FastifyTypedInstance, APIGeneralResponseSchemaFunction, APIGeneralResponseSchema } from "../../utils/types";
import { authController } from "./auth_controller";
import { authMiddleware } from "../../middlewares/auth";
import { AuthTokenSchema, UserSchema } from "../../../prisma/generated/zod";
import { PrismaClient } from "@prisma/client";

const signInUserSchema = z.object({
	email: z.string().email(),
	password: z.string()
})

const prisma = new PrismaClient()

export type signInUserInput = z.infer<typeof signInUserSchema>

const successSignInUserResponse = APIGeneralResponseSchemaFunction(z.object({
	authorized: z.boolean(),
	user: UserSchema.omit({
		password: true,
		created_at: true,
		updated_at: true,
		passwordResetToken: true,
	}),
	token: AuthTokenSchema.omit({
		id: true,
		userId: true
	})
}))

export type successSignInUserResponseType = z.infer<typeof successSignInUserResponse>

const logoutUserSchema = z.object({
	authTokenId: z.string(),
	userId: z.string()
})

export type logoutUserInput = z.infer<typeof logoutUserSchema>

const resetPasswordSchema = z.object({
	email: z.string().email()
})

export type resetPasswordInput = z.infer<typeof resetPasswordSchema>

export async function authRouter(app: FastifyTypedInstance) {
	app.post('/signIn', {
		schema: {
			tags: ['auth'],
			description: 'SignIn a user',
			body: signInUserSchema,
			response: {
				200: successSignInUserResponse,
				401: APIGeneralResponseSchema
			},
		}
	}, authController.signIn)

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
		preHandler: [authMiddleware],
		schema: {
			description: 'Reset password (send email to reset the password)',
			tags: ['auth'],
			body: resetPasswordSchema,
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