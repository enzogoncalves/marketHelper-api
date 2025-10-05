import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MarketListSchema } from "../../../prisma/generated/zod";
import { createListInput, createMarketListResponseType, deleteListInput, deleteListResponseType, deleteMarketListItemInput, getMarketListInput, getMarketListItemsType, marketListItemType } from "./marketList_router";
import { APIGeneralResponseType } from "../../utils/types";

type marketListType = z.infer<typeof MarketListSchema>
const prisma = new PrismaClient()

export const marketListController = {
	createList: async (req: FastifyRequest<{Body: createListInput, Params: any, Reply: any}>, reply: FastifyReply<{Body: createListInput, Reply: {200: createMarketListResponseType, 401: APIGeneralResponseType, 500: APIGeneralResponseType}}>) => {
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
			},
		})
		.then((marketList) => {
			return reply.status(200).send({
				success: true,
				message: 'List created successfully',
				data: marketList
			})
		})	
		.catch((e) => {
			return reply.status(500).send({success: false, error: {statusCode: 'DB_ERROR', type: 'Market List Error'}, message: 'Cannot create list. Try again later'})
		})
	},

	getList: async (req: FastifyRequest<{Body: any, Params: getMarketListInput, Reply: any}>, reply: FastifyReply<{Reply: {200: marketListType, 404: {message: String}, 500: {message: String}}}>) => {
		const { marketlist_id } = req.params;
		const { uid: userId } = req.user;

		console.log(req.user);

		await prisma.marketList.findFirst({
			where: {
				id: marketlist_id,
				userUid: userId
			}
		}).then((data) => {
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
			if(data == null) return reply.status(404).send({message: 'This list could not be found.'})

			await prisma.marketListItem.findMany({
				where: {
					marketListId: marketlist_id,
				},
				omit: {
					marketListId: true
				}
			}).then(async (marketListItemsWithoutPrice) => {
				if(marketListItemsWithoutPrice == null) return reply.status(404).send({message: 'Items could not be found.'})

				const marketListItems: Array<marketListItemType> = []

				for(const marketListItemWithoutPrice of marketListItemsWithoutPrice) {
					await prisma.price.findMany({
						where: {
							marketListItemId: marketListItemWithoutPrice.id,
						},omit: {
							marketListItemId: true
						}
					}).then((prices) => {
						const item = {
							marketListItem: marketListItemWithoutPrice,
							prices: prices
						}

						marketListItems.push(item)
					}).catch((e) => {
						console.log(e)
					})
				}

				const marketList = {
					marketList: data,
					items: marketListItems!
				}

				return reply.status(200).send(marketList)

				}).catch((e) => {
					console.log(e)
					return reply.status(500).send({message: 'Something went wrong'})
				})
		}).catch((e) => {
				console.log('aqui 2')
				return reply.status(500).send({message: 'Something went wrong! Try again'})
		})
	},

	deleteList: async (req: FastifyRequest<{Body: deleteListInput, Params: any, Reply: any}>, reply: FastifyReply<{Reply: {200: deleteListResponseType, 400: deleteListResponseType, 500: deleteListResponseType}}>) => {
		const { marketList_id } = req.body
		const { headers: { user_uid } } = req

		await Promise.all([
			await prisma.price.deleteMany({
				where: {
					MarketListItem: {
						marketListId: marketList_id
					}
				}
			}),
			await prisma.marketListItem.deleteMany({
				where: {
					marketListId: marketList_id
				}
			}),
			await prisma.marketList.delete({
				where: {
					id: marketList_id,
					userUid: user_uid as string
				}
			}),
		]).then((data) => {
			console.log(data)
			return reply.status(200).send({
				deleted: true,
				message: 'List deleted successfully'
			})
		}).catch((e) => {
			console.log(e)
			return reply.status(500).send({
				deleted: false,
				message: 'Something went wrong'
			})
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
			if(data == null) return reply.status(404).send({message: 'This list could not be found.'})

			await prisma.price.deleteMany({
				where: {
					marketListItemId: marketListItem_id
				}
			}).then(async (prices) => {
				console.log(prices)

				await prisma.marketListItem.delete({
				where: {
					id: marketListItem_id
				}
					}).then((marketListItem) => {
						return reply.status(200).send({message: 'Item deleted successfully', item: marketListItem})
					}).catch((e) => {
						if(e.meta.cause === "No record was found for a delete.") {
							return reply.status(404).send({message: 'No record was found for a delete.'})
						}
						return reply.status(500).send({message: 'Something went wrong 1'})
					})
			}).catch(e => {
				if(e.meta.cause === "No record was found for a delete.") {
					return reply.status(404).send({message: 'No price data was found for a delete.'})
				}
				return reply.status(500).send({message: 'Something went wrong 1'})
			})
		}).catch(e => {
			console.log(e)
			return reply.status(500).send({message: 'Something went wrong 2'})
		})
	}
}