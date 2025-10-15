import fp from 'fastify-plugin'
import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import { JWTInvalid } from "jose/errors";
import { jwtVerify } from "jose/jwt/verify"
import { z } from "zod";
import { FastifyTypedInstance } from "../utils/types.js";
const prisma = new PrismaClient()

export const tokenResponseSchema = z.object({
	authorized: z.boolean(),
	message: z.string()
})

export type tokenResponseType = z.infer<typeof tokenResponseSchema>

async function authPlugin (app: FastifyTypedInstance) {

	app.decorate('user', null)

	app.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {
		const { headers: { auth_token } } = req;

		if(auth_token === undefined) {
			console.log('Token not found');
			return reply.status(401).send()
		}

		await prisma.authToken.findFirst({
			where: {
				token: auth_token as string,
			},
			select: {
				token: true,
				userId: true,
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

			if(!secret) {
				throw new Error('JWT_SECRET is not configured on the server.') 
			}

			// if(data?.authToken!.token == null)

			try {
				const { payload, protectedHeader } = await jwtVerify(data!.token, secret, {
					issuer: 'urn:example:issuer',
					audience: 'urn:example:audience'
				})
				
				
				await prisma.user.findUnique({
					where: {
						uid: data!.userId
					}, select: {
						uid: true,
						email: true
					}
				}).then((user) => {
					if(!user) {
						throw new Error('User not found.');
					}

					req.user = user;
				}).catch(e => {
					console.log(e);
				})

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
		}).catch((e) => {
			console.log(e)
			return reply.status(401).send({
				authorized: false,
				message: 'Something went wrong while getting the token'
			});
		});
	});
}

export default fp(authPlugin);