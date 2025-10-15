import { PrismaClient } from "@prisma/client";
import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MarketListItem, MarketListItemSchema, MarketListSchema } from "../../../prisma/generated/zod/index.js";
import { APIGeneralResponseType } from "../../utils/types.js";
import { CreateListInput, createListItemInput, createMarketListResponseType, deleteListInput, deleteMarketListItemInput, getListItemResponseType, MarketListInput, getMarketListItemsType, marketListItemsType, getMarketListItemParamsType } from "./marketList_router.js";

type marketListType = z.infer<typeof MarketListSchema>

const prisma = new PrismaClient()

export const marketListController = {
	createList: async (req: FastifyRequest<{Body: CreateListInput, Params: any, Reply: any}>, reply: FastifyReply<{Reply: {200: createMarketListResponseType, 401: APIGeneralResponseType, 500: APIGeneralResponseType}}>) => {
		const { title } = req.body
		const { uid: user_id } = req.user; 

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

	getList: async (req: FastifyRequest<{Body: any, Params: MarketListInput, Reply: any}>, reply: FastifyReply<{Reply: {200: marketListType, 404: {message: String}, 500: {message: String}}}>) => {
		const { market_list_id } = req.params;
		const { uid: userId } = req.user;

		console.log(req.user);

		await prisma.marketList.findFirst({
			where: {
				id: market_list_id,
				userUid: userId // if this line is removed, any user could access any list by its id
			}
		}).then((data) => {
			if(data == null) return reply.status(404).send({message: 'This list could not be found.'})

			return reply.status(200).send(data!)
		}).catch(e => {
			return reply.status(500).send({message: 'Something went wrong! Try again'})
		})
	},

	getListItems: async (req: FastifyRequest<{Body: any, Params: MarketListInput, Reply: any}>, reply: FastifyReply<{Reply: {200: getMarketListItemsType, 404: {message: String}, 500: {message: String}}}>) => {
		const { market_list_id } = req.params
		const { uid: user_id } = req.user

		await prisma.marketList.findFirst({
			where: {
				id: market_list_id,
				userUid: user_id as string
			}
		}).then(async (data) => {	
			if(data == null) return reply.status(404).send({message: 'This list could not be found.'})

			await prisma.marketListItem.findMany({
				where: {
					marketListId: market_list_id,
				},
				omit: {
					marketListId: true
				}
			}).then(async (marketListItemsWithoutPrice) => {
				if(marketListItemsWithoutPrice == null) return reply.status(404).send({message: 'Items could not be found.'})

				const marketListItems: Array<marketListItemsType> = []

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

	deleteList: async (req: FastifyRequest<{Body: any, Params: deleteListInput, Reply: any}>, reply: FastifyReply) => {
		const { market_list_id } = req.params
		const { uid: user_id } = req.user

		try {
			await Promise.all([
				await prisma.price.deleteMany({
					where: {
						MarketListItem: {
							marketListId: market_list_id
						}
					}
				}),
				await prisma.marketListItem.deleteMany({
					where: {
						marketListId: market_list_id
					}
				}),
				await prisma.marketList.delete({
					where: {
						id: market_list_id,
						userUid: user_id as string
					}
				}),
			]).then((data) => {
				console.log(data)
				return reply.status(200).send()
			}).catch((e) => {
				console.log('aqui 1')
				console.log(e)
				return reply.status(500).send()
			})
		} catch(e) {
			console.log('aqui 2')
			console.log(e);
			return reply.status(500).send()
		}
	},

	deleteItem: async (req: FastifyRequest<{Body: any, Params: deleteMarketListItemInput, Reply: any}>, reply: FastifyReply<{Reply: {200: any, 404: {message: String}, 500: {message: String}}}>) => {
		const { market_list_id, market_list_item_id } = req.params
		const { uid: user_id } = req.user

		await prisma.marketList.findFirst({
			where: {
				id: market_list_id,
				userUid: user_id as string
			}
		}).then( async(data) => {	
			if(data == null) return reply.status(404).send({message: 'This list could not be found.'})

			await prisma.price.deleteMany({
				where: {
					marketListItemId: market_list_item_id
				}
			}).then(async (prices) => {
				console.log(prices)

				await prisma.marketListItem.delete({
				where: {
					id: market_list_item_id
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
	},

  // MARKET LIST ITEM CONTROLLER

	createItem: async (req: FastifyRequest<{Body: createListItemInput, Params: MarketListInput, Reply: any}>, reply: FastifyReply<{Reply: {200: MarketListItem, 404: {message: string}, 500: {message: string}}}>) => {
		const { name, prices, quantity, currency, weight, brand } = req.body 
		const {market_list_id } = req.params
		const { uid: user_id } = req.user

		console.log(req.params)

		await prisma.marketList.findFirst({
			where: {
				id: market_list_id,
				userUid: user_id as string
			}
		}).then( async(data) => {	
			console.log(data)
			console.log(market_list_id)

			if(data == null) return reply.status(404).send({message: 'This list could not be found.'})
			
			await prisma.marketListItem.create({
				data: {
					name: name,
					weight: weight,
					prices: {
						create: prices
					},
					brand: brand,
					quantity: quantity,
					currency: currency,
					MarketList: {
						connect: {
							id: market_list_id
						}
					},
				}
			}).then((marketListItem) => {
				console.log(marketListItem)
				return reply.status(200).send(marketListItem)
			}).catch((e) => {
				return reply.status(500).send({message: 'Something went wrong'})
			})
			
		}).catch(e => {
			console.log(e)
			return reply.status(500).send({message: 'Something went wrong'})
		})
	},

	getItem: async (req: FastifyRequest<{Body: any, Params: getMarketListItemParamsType, Reply: any}>, reply: FastifyReply<{Reply: {200: getListItemResponseType, 404: {message: string}, 500: {message: string}}}>) => {
		const {  market_list_id, market_list_item_id } = req.params
		const { uid: user_id } = req.user

		await prisma.marketList.findFirst({
			where: {
				id: market_list_id,
				userUid: user_id as string
			}
		}).then( async(data) => {	
			console.log(data)
			console.log(market_list_id)

			if(data == null) return reply.status(404).send({message: 'This list could not be found.'})
			
			await prisma.marketListItem.findFirst({
				where: {
					id: market_list_item_id,
					marketListId: market_list_id
				}
			}).then(async(marketListItem) => {
				console.log(marketListItem)
				if(marketListItem == null) return reply.status(404).send({message: 'This list item could not be found.'}) 

				await prisma.price.findMany({
					where: {
						marketListItemId: marketListItem.id,
					}
				}).then((prices) => {
					console.table(prices)

					const item = {
						marketListItem,
						prices: prices
					}

					console.log(item)

					return reply.status(200).send(item)
				}).catch((e) => {
					console.log(e)
					return reply.status(500).send({message: 'Something went wrong'})
				})
				
			}).catch((e) => {
				return reply.status(500).send({message: 'Something went wrong'})
			})
			
		}).catch(e => {
			console.log(e)
			return reply.status(500).send({message: 'Something went wrong'})
		})
	},

}