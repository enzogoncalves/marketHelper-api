import { FastifyReply, FastifyRequest } from "fastify";
import { MarketListSchema } from "../../../prisma/generated/zod";
import z from "zod";
import { createListInput, deleteListInput, deleteListResponseType, deleteMarketListItemInput, getMarketListInput, getMarketListItemsType } from "./marketList_router";
import { PrismaClient } from "@prisma/client";

type marketListType = z.infer<typeof MarketListSchema>
const prisma = new PrismaClient()

export const marketListController = {
	createList: async (req: FastifyRequest<{Body: createListInput, Params: any, Reply: any}>, reply: FastifyReply<{Body: createListInput, Reply: {200: marketListType, 401: {message: String}, 500: {message: String}}}>) => {
		const { title } = req.body
		const { headers: { user_id } } = req

		await prisma.marketList.create({
			data: {
				title,
				User: {
					connect: {
						uid: user_id as string
					}
				},
			},
			include: {
				User: true
			}
		})
		.then((marketList) => {
			return reply.status(200).send(marketList)
		})	
		.catch((e) => {
			return reply.status(500).send({message: 'Something went wrong'})
		})
	},

	getList: async (req: FastifyRequest<{Body: any, Params: getMarketListInput, Reply: any}>, reply: FastifyReply<{Reply: {200: marketListType, 404: {message: String}, 500: {message: String}}}>) => {
		const { marketlist_id } = req.params
		const { headers: { user_id } } = req

		await prisma.marketList.findFirst({
			where: {
				id: marketlist_id,
				userUid: user_id as string
			}
		}).then((data) => {	
			console.log(data)
			
			if(data == null) return reply.status(404).send({message: 'This list could not be found.'})

			return reply.status(200).send(data!)
		}).catch(e => {
			return reply.status(500).send({message: 'Something went wrong! Try again'})
		})
	},

	getListItems: async (req: FastifyRequest<{Body: any, Params: getMarketListInput, Reply: any}>, reply: FastifyReply<{Reply: {200: getMarketListItemsType, 404: {message: String}, 500: {message: String}}}>) => {
		const { marketlist_id } = req.params
		const { headers: { user_id } } = req

		await prisma.marketList.findFirst({
			where: {
				id: marketlist_id,
				userUid: user_id as string
			}
		}).then(async (data) => {	
			console.log(data)
			
			if(data == null) return reply.status(404).send({message: 'This list could not be found.'})

			await prisma.marketListItem.findMany({
				where: {
					marketListId: marketlist_id,
				}
			}).then((items) => {
				console.log(items)

				if(items == null) return reply.status(404).send({message: 'Items could not be found.'})

				const marketListItems = {
					marketList: data,
					items: items 
				}
				
				return reply.status(200).send(marketListItems)

			}).catch(e => {
				return reply.status(500).send({message: 'Something went wrong! Try again'})
			})
		}).catch(e => {
			return reply.status(500).send({message: 'Something went wrong! Try again'})
		})
	},

	deleteList: async (req: FastifyRequest<{Body: deleteListInput, Params: any, Reply: any}>, reply: FastifyReply<{Reply: {200: deleteListResponseType, 400: deleteListResponseType, 500: deleteListResponseType}}>) => {
		const { marketList_id } = req.body
		const { headers: { user_uid } } = req

		await prisma.marketList.delete({
			where: {
				id: marketList_id,
				userUid: user_uid as string
			}
		}).then((data) => {
			console.log(data)
			return reply.status(200).send({deleted: true, message: 'Successfully deleted the list'})
		}).catch(e => {
			return reply.status(500).send({deleted: false, message: 'Something went wrong! Try again'})
		})
	},

	deleteItem: async (req: FastifyRequest<{Body: deleteMarketListItemInput, Params: any, Reply: any}>, reply: FastifyReply<{Reply: {200: any, 404: {message: String}, 500: {message: String}}}>) => {
		const { marketList_id, marketListItem_id } = req.body
		const { headers: { user_id } } = req

		await prisma.marketList.findFirst({
			where: {
				id: marketList_id,
				userUid: user_id as string
			}
		}).then( async(data) => {	
			console.log(data)
			console.log(marketList_id)

			if(data == null) return reply.status(404).send({message: 'This list could not be found.'})

			console.log(marketListItem_id)
			
			await prisma.marketListItem.delete({
				where: {
					id: marketListItem_id
				}
			}).then((marketListItem) => {
				console.log(marketListItem)
				return reply.status(200).send()
			}).catch((e) => {
				console.log(e)
				return reply.status(500).send({message: 'Something went wrong'})
			})
			
		}).catch(e => {
			console.log(e)
			return reply.status(500).send({message: 'Something went wrong'})
		})
	}
}