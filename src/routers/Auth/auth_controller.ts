import { PrismaClient } from "@prisma/client";
import { addDays, addHours, addMinutes, addMonths } from "date-fns";
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend";
import { FastifyReply, FastifyRequest } from "fastify";
import { SignJWT } from "jose";

import { loginUserInput, successLoginUserResponseType, loginUserUnauthorizedResponseType, logoutUserInput, resetPasswordInput } from "./auth_router";

import bcrypt from 'bcrypt';
const prisma = new PrismaClient()

export const authController = {
	signin: async (req: FastifyRequest<{Body: loginUserInput}>, reply: FastifyReply<{Reply: {200: successLoginUserResponseType, 401: loginUserUnauthorizedResponseType, 500: any}, Body: loginUserInput}>) => {
		const { email, password } = req.body;
		
		const user = await prisma.user.findFirst({
			where: {
				email: email
			}
		})
		
		const authorized = user && (await bcrypt.compare(password, user.password))
	
		if(!user || !authorized) {
			return reply.status(401).send({message: "Invalid email or password"} as loginUserUnauthorizedResponseType)
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

		const authorizedUser = await prisma.user.update({
			where: {
				uid: user.uid
			},
			data: {
				authToken: {
					create: { token: jwt!, createdAt: date, expiresAt: tokenExpiredDate }
				}
			},
			include: {
				authToken: true
			}
		})

		const payload = {
			uid: user.uid,
			email: user.email,
			name: user.name
		}
	
		const token = req.jwt.sign(payload)

		reply.setCookie('access_token', token, {
			path: '/',
			httpOnly: true,
			secure: true
		})

		reply.status(200).send({
			authorized: true,
			tokenId: authorizedUser.authTokenId!,
			userId: authorizedUser.uid
		})
	},
	
	signout: async(req: FastifyRequest<{Body: logoutUserInput}>, reply: FastifyReply) => {
		const { authTokenId, userId } = req.body

		console.log(`authTokenId: ${authTokenId}`)
		console.log(`userId: ${userId}`)

		try {
			const user = await prisma.user.update({
				where: {
					authTokenId: authTokenId,
					uid: userId
				},
				data: {
					authToken: {
						disconnect: true
					}
				},
				include: {
					authToken: true
				}
			})

			console.log(`user: ${user}`)
		} catch(e) {
			console.log('unable to delete authTokenId in user')
			console.log(e)
			return reply.status(500).send(e)
		}

		try {
			const authToken = await prisma.authToken.delete({
				where: {
					id: authTokenId
				}
			})
		} catch(e) {
			console.log('unable to delete authToken')
			console.log(e)
			return reply.status(500).send(e)
		}

		reply.clearCookie('access_token')

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