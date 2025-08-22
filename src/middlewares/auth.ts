import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { JWTInvalid } from "jose/errors";
import { jwtVerify } from "jose/jwt/verify"
import { z } from "zod";
const prisma = new PrismaClient()

export const tokenResponseSchema = z.object({
	authorized: z.boolean(),
	message: z.string()
})

export type tokenResponseType = z.infer<typeof tokenResponseSchema>

export const authMiddleware = async (req: FastifyRequest<{Body: any, Params: any, Reply: any}>, reply: FastifyReply<{Reply: {401: tokenResponseType}}>) => {
	const { headers: { auth_token = '', user_id } } = req;

	await prisma.authToken.findFirst({
		where: {
			token: auth_token as string,
			userId: user_id as string,
		},
		select: {
			token: true
		}
	})
	.then(async (data) => {
		if(!data) {
			console.log('não encontrado')
			return reply.status(401).send({
				authorized: false,
				message: 'Token not found'
			})
		}

		const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

		// if(data?.authToken!.token == null)

		try {
			const { payload, protectedHeader } = await jwtVerify(data!.token, secret, {
				issuer: 'urn:example:issuer',
				audience: 'urn:example:audience'
			})
			
			// console.log(`payload: ${payload}`)
			// console.log(`protectedHeader: ${protectedHeader}`)

			// commented to prevent the limit of the api call
			// return reply.status(200).send({message: 'Authorized'})
		} catch(e) {
			console.log(e)
			const error = e as JWTInvalid

			switch(error.code) {
				case 'ERR_JWT_EXPIRED':
					return reply.status(401).send({
						authorized: false,
						message: 'Token expired'
					});
				default: 
					return reply.status(401).send({
						authorized: false,
						message: 'Invalid token'
					});
			}
		}
	})
	.catch((e) => {
		console.log(e)
		return reply.status(401).send({
			authorized: false,
			message: 'Something went wrong while verifying the token'
		})
	})
}