import { JWT } from "@fastify/jwt";
import { FastifyBaseLogger, FastifyInstance, RawReplyDefaultExpression, RawRequestDefaultExpression, RawServerDefault } from "fastify";
import { ZodTypeProvider } from "fastify-type-provider-zod";
import { z } from "zod";

export type FastifyTypedInstance = FastifyInstance<
	RawServerDefault,
	RawRequestDefaultExpression,
	RawReplyDefaultExpression,
	FastifyBaseLogger,
	ZodTypeProvider
>

declare module 'fastify' {
	interface FastifyRequest {
		jwt: JWT
	}
	export interface FastifyInstance {
		authenticate: any
	}
}

type UserPayload = {
	uid: string,
	email: string,
	name: string,
}

declare module '@fastify/jwt' {
	interface FastifyJWT {
		user: UserPayload
	}
}

export function APIGeneralResponseSchemaFunction<DataType extends z.ZodTypeAny>(dataSchema: DataType) {
	return z.object({
		message: z.string(),
		success: z.boolean(),
		error: z.object({
			statusCode: z.string(),
			type: z.string(),
		}).optional(),
		data: dataSchema.optional()
	});
}

export const APIGeneralResponseSchema = APIGeneralResponseSchemaFunction(z.null());

export type APIGeneralResponseType = z.infer<typeof APIGeneralResponseSchema>;