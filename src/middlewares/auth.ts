import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { JWTInvalid } from "jose/errors";
import { jwtVerify } from "jose/jwt/verify"
const prisma = new PrismaClient()

export const authMiddleware = async (req: FastifyRequest<{Body: any, Params: any}>, reply: FastifyReply) => {
	const { headers: { auth_token_id = '', user_id } } = req;

	await prisma.user.findFirst({
		where: {
			uid: user_id as string,
			authTokenId: auth_token_id as string
		},
		select: {
			authToken: {
				select: {
					token: true
				}
			}
		}
	})
	.then(async (data) => {
		if(!data) {
			console.log('não encontrado')
			return reply.status(401).send({message: 'Unauthorized Token'})
		}

		const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

		// if(data?.authToken!.token == null)

		try {
			const { payload, protectedHeader } = await jwtVerify(data!.authToken!.token, secret, {
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
					return reply.status(401).send({message: 'Expired Token'});
				default: 
					return reply.status(401).send({message: 'Unauthorized Token'});
			}
		}
	})
	.catch((e) => {
		console.log(e)
		return reply.status(401).send({message: 'Unable to find user token'})
	})
}