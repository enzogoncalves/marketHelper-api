import { FastifyReply, FastifyRequest } from "fastify";
import z from "zod";
import { MarketListItemSchema } from "../../../prisma/generated/zod";
import { PrismaClient } from "@prisma/client";
import { createListItemInput, getListItemResponseType, getMarketListItemQueryType } from "./marketListItem_router";

type marketListItemType = z.infer<typeof MarketListItemSchema>

const getMarketListItemParams = z.object({
	marketList_id: z.string(),
	marketListItem_id: z.string()
})

type getMarketListItemParamsType = z.infer<typeof getMarketListItemParams>

const prisma = new PrismaClient()

export const marketListItemController = {
	create: async (req: FastifyRequest<{Body: createListItemInput, Params: any, Reply: any}>, reply: FastifyReply<{Reply: {200: marketListItemType, 404: {message: string}, 500: {message: string}}}>) => {
		const { name, prices, quantity, marketList_id, currency, weight, brand } = req.body 
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
							id: marketList_id
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

	getItem: async (req: FastifyRequest<{Body: any, Params: any, Reply: any, Querystring: getMarketListItemQueryType}>, reply: FastifyReply<{Reply: {200: getListItemResponseType, 404: {message: string}, 500: {message: string}}}>) => {
		const {  marketList_id, marketListItem_id } = req.query
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
			
			await prisma.marketListItem.findFirst({
				where: {
					id: marketListItem_id,
					marketListId: marketList_id
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