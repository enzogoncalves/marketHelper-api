import z from 'zod';
import { FastifyTypedInstance } from "../../utils/types";
import { authController } from "./auth_controller";
import { authMiddleware } from "../../middlewares/auth";

const loginUserSchema = z.object({
	email: z.string().email(),
	password: z.string()
})

export type loginUserInput = z.infer<typeof loginUserSchema>

const successLoginUserResponse = z.object({
	authorized: z.boolean(),
	userId: z.string(),
	tokenId: z.string()
})

export type successLoginUserResponseType = z.infer<typeof successLoginUserResponse>

const loginUserUnauthorizedResponseSchema = z.object({
	message: z.enum(['Invalid email or password'])
})

export type loginUserUnauthorizedResponseType = z.infer<typeof loginUserUnauthorizedResponseSchema>

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
	app.post('/signin', {
		schema: {
			tags: ['auth'],
			description: 'Login a user',
			body: loginUserSchema,
			response: {
				200: successLoginUserResponse,
				401: loginUserUnauthorizedResponseSchema
			},
		}
	}, authController.signin)

	app.delete('/signout', {
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
			body: resetPasswordSchema
		}
	}, authController.sendPasswordResetLinkInEmail)
}