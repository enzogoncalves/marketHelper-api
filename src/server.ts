import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fjwt, { FastifyJWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'

import { userRouter } from "./routers/User/user_router";
import { usersRouter } from "./routers/Users/users_router";
import { authRouter } from "./routers/Auth/auth_router";
import { marketListRouter } from "./routers/MarketList/marketList_router";
import { marketListItemRouter } from "./routers/MarketListItem/marketListItem_router";

export const app = Fastify().withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*'})

app.register(fjwt, { secret: 'my-secret-key' }) //TODO: Change this at production

app.addHook('preHandler', (req, res, next) => {
	req.jwt = app.jwt
	return next()
})

//cookies
app.register(fCookie, {
	secret: 'some-secret-key',
	hook: 'preHandler'
})

app.decorate(
	'authenticate',
	async (req: FastifyRequest, reply: FastifyReply) => {
		const token = req.cookies.access_token

		if (!token) {
      return reply.status(401).send({ message: 'Authentication required' })
    }
    // here decoded will be a different type by default but we want it to be of user-payload type
    const decoded = req.jwt.verify<FastifyJWT['user']>(token)
    req.user = decoded
	}
)

app.register(fastifySwagger, {
	openapi: {
		info: {
			title: 'Market Helper API',
			version: '1.0.0'
		}
	},
	transform: jsonSchemaTransform
})

app.register(fastifySwaggerUi, {
	routePrefix: '/docs'
})

app.get('/', async (req, reply) => {
	reply.send({ message: `Welcome to the Market Helper API! Please read the documentations at http://localhost:3000/docs`  })
})

app.register(authRouter, { prefix: '/auth'})
app.register(userRouter, { prefix: '/user'})
app.register(usersRouter, { prefix: '/users'})
app.register(marketListRouter, { prefix: '/marketList'})
app.register(marketListItemRouter, { prefix: '/marketListItem'})

app.listen({host: '0.0.0.0', port: process.env.PORT ? Number(process.env.PORT) : 3000}).then(() => {
	console.log(`HTTP server running at port ${process.env.PORT ? Number(process.env.PORT) : '3000'}!`)
}).catch((e) => console.log(e))