import { PrismaClient } from "@prisma/client";
import { addMinutes, addMonths } from "date-fns";
import { FastifyReply, FastifyRequest } from "fastify";
import { SignJWT } from "jose";
import { EmailParams, MailerSend, Recipient, Sender } from "mailersend";
import { JWTInvalid } from "jose/errors";
import { jwtVerify } from "jose/jwt/verify"

import { logoutUserInput, resetPasswordInput, signInUserInput, successSignInUserResponseType } from "./auth_router";

import bcrypt from 'bcrypt';
import { APIGeneralResponseType } from "../../utils/types";
import { z } from "zod";
import { UserSchema } from "../../../prisma/generated/zod";

const prisma = new PrismaClient()

export const authController = {
	signIn: async (req: FastifyRequest<{Body: signInUserInput}>, reply: FastifyReply<{Reply: {200: successSignInUserResponseType, 401: APIGeneralResponseType, 400: any, 500: any}, Body: signInUserInput}>) => {
		const { email, password } = req.body;
		console.log(req.jwt)
		
		const user = await prisma.user.findFirst({
			where: {
				email: email
			}, select: {
				password: true,
				uid: true,
				email: true,
			}
		})
		
		const authorized = user && (await bcrypt.compare(password, user.password))
	
		if(!user || !authorized) {
			return reply.status(401).send({
				message: 'Invalid email or password',
				success: false,
				error: {
					statusCode: '401',
					type: 'AUTH_INVALID_CREDENTIALS'
				}
			})
		}

		const userToken = await prisma.authToken.findFirst({
			where: {
				userId: user.uid
			},
			select: {
				token: true,
				expiresAt: true,
				createdAt: true,
			}
		})

		const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

		try {
			const { payload, protectedHeader } = await jwtVerify(userToken!.token, secret, {
				issuer: 'urn:example:issuer',
				audience: 'urn:example:audience'
			})
		} catch(e) {
			console.log(e)
			const error = e as JWTInvalid

			switch(error.code) {
				case 'ERR_JWT_EXPIRED':
					// TODO: what happens if the token is expired:
					
				default: 
					return reply.status(401).send({
						success: false,
						error: {
							statusCode: '401',
							type: 'AUTH_INVALID_CREDENTIALS',
						},
						message: 'Invalid token'
					});
			}
		}

		if(userToken) {
			reply.status(200).send({
				message: 'User signed in successfully',
				success: true,
				data: {
					authorized: true,
					token: userToken,
					user: {
						email: user.email,
						uid: user.uid
					}
				}	
			})
		}



		const date = new Date();
		const timeToExpiresTokenInHours = 1;
		
		/**
		 * Use addSeconds(), addMinutes(), addDays() functions to set the token expired date
		*/
		const tokenExpiredDate = addMonths(date, timeToExpiresTokenInHours)

		let jwt;

		try {
			const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
				
			const alg = 'HS256'
			
			jwt = await new SignJWT({  })
			.setProtectedHeader({ alg })
			.setIssuedAt()
			.setIssuer('urn:example:issuer')
			.setAudience('urn:example:audience')
			.setExpirationTime(tokenExpiredDate)
			.sign(secret)
		} catch(e) {
			console.log('aqui')
			console.log(e)
			reply.status(500).send('Unable to create JWT Token')
		}

		const tokenConnectedToUser = await prisma.authToken.create({
			data: { 
				token: jwt!, 
				createdAt: date, 
				expiresAt: tokenExpiredDate, 
				user: {
					connect: {
						uid: user.uid
					}
				}		
			},
			select: {
				token: true,
				id: false,
				expiresAt: true,
				createdAt: true,
			}
		})

		const payload = {
			uid: user.uid,
			email: user.email,
		}
	
		const token = req.jwt.sign(payload)

		reply.setCookie('access_token', token, {
			path: '/',
			httpOnly: true,
			secure: true
		})

		reply.status(200).send({
			message: 'User signed in successfully',
			success: true,
			data: {
				authorized: true,
				token: tokenConnectedToUser,
				user: {
					email: user.email,
					uid: user.uid
				}
			}	
		})
	},
	
	signout: async(req: FastifyRequest<{Body: logoutUserInput}>, reply: FastifyReply) => {
		const { authTokenId, userId } = req.body

		console.log(`authTokenId: ${authTokenId}`)
		console.log(`userId: ${userId}`)

		try {
			const authToken = await prisma.authToken.delete({
				where: {
					id: authTokenId,
					userId: userId
				}
			})

			console.log(authToken)
			reply.clearCookie('access_token')
			return reply.status(200).send({message: 'Logout successful'})
		} catch(e) {
			console.log('unable to delete authToken')
			console.log(e)
			return reply.status(500).send(e)
		}


		return reply.send({ message: 'Logout successful '})
	},

	sendPasswordResetLinkInEmail: async (req: FastifyRequest<{Body: resetPasswordInput}>, reply: FastifyReply) => {
		const { email } = req.body

		await prisma.user.findFirst({
			where: {
				email: email
			}
		}).then(async (user) => {
			if(!user) {
				return reply.status(404).send({message: 'User not found for the given email'})
			}

			const date = new Date();
			const timeToExpiresTokenInMinutes = 15;
			const tokenExpiredDate = addMinutes(date, timeToExpiresTokenInMinutes)

			let jwt;

			try {
				const secret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
					
				const alg = 'HS256'
				
				jwt = await new SignJWT({  })
				.setProtectedHeader({ alg })
				.setIssuedAt()
				.setIssuer('urn:example:issuer')
				.setAudience('urn:example:audience')
				.setExpirationTime(tokenExpiredDate)
				.sign(secret)
			} catch(e) {
				console.log('aqui')
				console.log(e)
				return reply.status(500).send('Unable to create JWT Token')
			}

			await prisma.user.update({
				where: {
					uid: user.uid
				},
				data: {
					passwordResetToken: jwt!
				}
			}).then(async (data) => {
				const mailerSend = new MailerSend({
					apiKey: process.env.MAILERSEND_API_KEY!,
				});
				
				const sentFrom = new Sender("MS_7sTe6y@enzomateus.com.br", "Enzo Mateus Gonçalves");
				
				const recipients = [
					new Recipient("enzomateusgonc@gmail.com", "Enzo Mateus Gonçalves")
				];

				const personalization = [{
					email: "enzomateusgonc@gmail.com",
					data: {
						name: 'Enzo',
						resetLink: 'https://enzomateus.com.br'
					}
				}]
				
				const emailParams = new EmailParams()
					.setFrom(sentFrom)
					.setTo(recipients)
					.setReplyTo(sentFrom)
					.setSubject("Reset Password Link")
					.setTemplateId("7dnvo4d8vvxl5r86")
					.setPersonalization(personalization)
				
				await mailerSend.email.send(emailParams)
				.then((data) => {
					console.log(`Successfull email: ${data}`)
					return reply.status(200).send({message: 'Sucessfull'})
				}).catch((e) => {	
					console.log(e)
					return reply.status(500).send('Unable to send email')
				})

			}).catch((e) => {	
				return reply.status(500).send('Unable to save JWT Token')
			})
			
		}).catch((e) => {
				return reply.status(500).send({message: 'Something went wrong'})	
		})	
	}
}