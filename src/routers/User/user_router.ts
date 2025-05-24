import { UserSchema } from "../../../prisma/generated/zod";
import { authMiddleware } from "../../middlewares/auth";
import { FastifyTypedInstance } from "../../utils/types";
import z from 'zod'
import { userController } from "./user_controller";

const getUserSchema = z.object({
	userId: z.string()
})

export type getUserInput = z.infer<typeof getUserSchema>;

export async function userRouter(app: FastifyTypedInstance) {
	app.get('/', {
		preHandler: [authMiddleware],
		schema: {
			tags: ['user'],
			description: 'Get user data',
			response: {
				200: UserSchema
			}
		}
	}, userController.user)
}