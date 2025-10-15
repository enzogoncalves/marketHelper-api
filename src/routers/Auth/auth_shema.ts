import { z } from "zod";
import { APIGeneralResponseSchemaFunction } from "../../utils/types.js";
import { UserSchema } from "../../../prisma/generated/zod/index.js";

export const createUserSchema = z.object({
		email: z.string().email(),
		password: z.string().min(6),
});

export const loginUserSchema = z.object({
		email: z.string().email(),
		password: z.string(),
});

export const successLoginUserResponse = APIGeneralResponseSchemaFunction(z.object({
	user: UserSchema.omit({
		password: true,
		created_at: true,
		updated_at: true,
		passwordResetToken: true,
	})
}))

export const logoutUserSchema = z.object({
		authTokenId: z.string(),
		userId: z.string()
});