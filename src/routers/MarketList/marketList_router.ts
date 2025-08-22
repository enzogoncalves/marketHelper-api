import { MarketListItemSchema, MarketListSchema, PriceSchema } from "../../../prisma/generated/zod";
import { authMiddleware } from "../../middlewares/auth";
import { FastifyTypedInstance } from "../../utils/types";
import { marketListController } from "./marketList_controller";
import z from 'zod'

const createListSchema = z.object({
	title: z.string(),
})

export type createListInput = z.infer<typeof createListSchema>

const getListSchema = z.object({
	marketlist_id: z.string()
})

export type getMarketListInput = z.infer<typeof getListSchema>

const marketListItemSchema = z.object({
	marketListItem: MarketListItemSchema.omit({
		marketListId: true,
	}),
	prices: PriceSchema.omit({
		marketListItemId: true,
}).array()})

export type marketListItemType = z.infer<typeof marketListItemSchema>

const getMarketListItemsSchema = z.object({
	marketList: MarketListSchema,
	items: marketListItemSchema.array()
})

export type getMarketListItemsType = z.infer<typeof getMarketListItemsSchema>

const deleteListSchema = z.object({
	marketList_id: z.string()
})

export type deleteListInput = z.infer<typeof deleteListSchema>

const deleteListResponse = z.object({
	deleted: z.boolean(),
	message: z.string()
})

export type deleteListResponseType = z.infer<typeof deleteListResponse>

const deleteMarketListItemSchema = z.object({
	marketList_id: z.string(),
	marketListItem_id: z.string()
})

export type deleteMarketListItemInput = z.infer<typeof deleteMarketListItemSchema>

export async function marketListRouter(app: FastifyTypedInstance) {
	app.post('/', {
		preHandler: [authMiddleware],
		schema: {
			tags: ['Market List'],
			description: 'Create a market list',
			body: createListSchema,
			response: {
				200: MarketListSchema,
				401: z.object({
					message: z.string()
				})
			}	
		}
	}, marketListController.createList)

	app.get('/:marketlist_id', {
		preHandler: [authMiddleware],
		schema: {
			tags: ['Market List'],
			description: 'Gets the data of a single market list',
			response: {
				200: MarketListSchema,
				401: z.object({
					message: z.string()
				}),
				500: z.object({
					message: z.string()
				})
			}
		}
	}, marketListController.getList)

	app.get('/:marketlist_id/items', {
		preHandler: [authMiddleware],
		schema: {
			tags: ['Market List'],
			description: 'Gets the data of a single market list and his items',
			response: {
				200: getMarketListItemsSchema,
				401: z.object({
					message: z.string()
				}),
				500: z.object({
					message: z.string()
				})
			}
		}
	}, marketListController.getListItems)

	app.delete('/deleteList', {
		preHandler: [authMiddleware],
		schema: {
			tags: ['Market List'],
			description: 'Delete a market list and his entire data',
			body: deleteListSchema,
			response: {
				200: deleteListResponse,
				401: deleteListResponse,
				500: deleteListResponse
			}
		}
	}, marketListController.deleteList)

	app.delete('/deleteItem', {
		preHandler: [authMiddleware],
		schema: {
			tags: ['Market List'],
			description: 'Delete an item of a market list',
			body: deleteMarketListItemSchema,
		}
	}, marketListController.deleteItem)
}