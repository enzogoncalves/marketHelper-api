import Fastify, { FastifyReply, FastifyRequest } from 'fastify';
import FastifyMultipart from '@fastify/multipart';
import fastifyStatic from '@fastify/static';

import { fastifyCors } from '@fastify/cors'
import { validatorCompiler, serializerCompiler, ZodTypeProvider, jsonSchemaTransform } from "fastify-type-provider-zod";
import { fastifySwagger } from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fjwt, { FastifyJWT } from '@fastify/jwt'
import fCookie from '@fastify/cookie'

import ScalarApiReference from '@scalar/fastify-api-reference';


import { userRouter } from "./routers/User/user_router.js";
import { usersRouter } from "./routers/Users/users_router.js";
import { authRouter } from "./routers/Auth/auth_router.js";
import { marketListRouter } from "./routers/MarketList/marketList_router.js";
import { imageDetectionRouter } from "./routers/ImageDetection/imageDetection_router.js";
import path from "path";
import { textExtractionRouter } from "./routers/TextExtraction/textExtractionRouter.js";

import authPlugin from './middlewares/auth.js'
import { version } from "os";

export const app = Fastify({
	logger: true
}).withTypeProvider<ZodTypeProvider>();

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifyCors, { origin: '*'})

app.register(fjwt, { secret: 'my-secret-key' }) //TODO: Change this at production

app.register(FastifyMultipart, {
	// attachFieldsToBody: true,
	limits: {
		fileSize: 1000 * 1024 * 1024, // 1 GB
	}
})

app.register(authPlugin)

// app.register(fastifyStatic), ({
//   root: path.join(__dirname, 'uploads'), // Path to your uploads directory
//   prefix: '/images/', // Optional: Prefix for serving images
// });

// app.addHook('preHandler', (req, res, next) => {
// 	req.jwt = app.jwt
// 	return next()
// })

//cookies
// app.register(fCookie, {
// 	secret: 'some-secret-key',
// 	hook: 'preHandler'
// })

// app.decorate(
// 	'authenticate',
// 	async (req: FastifyRequest, reply: FastifyReply) => {
// 		const token = req.cookies.access_token

// 		if (!token) {
//       return reply.status(401).send({ message: 'Authentication required' })
//     }
//     // here decoded will be a different type by default but we want it to be of user-payload type
//     const decoded = req.jwt.verify<FastifyJWT['user']>(token)
//     req.user = decoded
// 	}
// )

// Generate Open Api Documentation (if this gets deleted, the scalar and swaggerUi will not work)
app.register(fastifySwagger, {
	prefix: '/docs',
	openapi: {
		info: {
			title: 'Market Helper API',
			version: '1.0.0'
		}
	},
	transform: jsonSchemaTransform
})

// If you want to use Swagger UI
// app.register(fastifySwaggerUi, {
// 	routePrefix: '/docs'
// })

// Scalar Api Reference
await app.register(ScalarApiReference, {
  routePrefix: '/reference',
	configuration: {
		title: 'Market Helper API',
	},
})

app.get('/', async (req, reply) => {
	reply.send({ message: `Welcome to the Market Helper API! Please read the documentations at http://localhost:3000/reference`  })
})

app.register(authRouter, { prefix: '/auth'})
app.register(userRouter, { prefix: '/user'})
app.register(usersRouter, { prefix: '/users'})
app.register(marketListRouter, { prefix: '/market-list'})
app.register(imageDetectionRouter, { prefix: '/imageDetection'})
app.register(textExtractionRouter, { prefix: '/textExtraction'})

app.listen({host: '0.0.0.0', port: process.env.PORT ? Number(process.env.PORT) : 3000}).then(() => {
	console.log(`HTTP server running at port ${process.env.PORT ? Number(process.env.PORT) : '3000'}!`)
}).catch((e) => console.log(e))