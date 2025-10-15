import { MarketListItemSchema, MarketListSchema, PriceSchema } from "../../../prisma/generated/zod/index.js";
import { APIGeneralResponseSchemaFunction, FastifyTypedInstance } from "../../utils/types.js";
import { marketListController } from "./marketList_controller.js";
import z from 'zod'

// POST "/marketList"
const createListSchema = z.object({
	title: z.string(),
})
export type CreateListInput = z.infer<typeof createListSchema>

// Response schema of POST "/marketList"
const createMarketListSchema = APIGeneralResponseSchemaFunction(MarketListSchema);
export type createMarketListResponseType = z.infer<typeof createMarketListSchema>

// GET "/marketList/:market_list_id"
const marketListSchema = z.object({
	market_list_id: z.string()
})
export type MarketListInput = z.infer<typeof marketListSchema>


const marketListItemSchema = z.object({
	marketListItem: MarketListItemSchema.omit({
		marketListId: true,
	}),
	prices: PriceSchema.omit({
		marketListItemId: true,
}).array()})

export type marketListItemsType = z.infer<typeof marketListItemSchema>

// GET "/market-list/:market_list_id/items"
const getMarketListItemsSchema = z.object({
	marketList: MarketListSchema,
	items: marketListItemSchema.array()
})
export type getMarketListItemsType = z.infer<typeof getMarketListItemsSchema>

// DELETE "/market-list/"
const deleteListSchema = z.object({
	market_list_id: z.string()
})
export type deleteListInput = z.infer<typeof deleteListSchema>

const deleteMarketListItemSchema = z.object({
	market_list_id: z.string(),
	market_list_item_id: z.string()
})

export type deleteMarketListItemInput = z.infer<typeof deleteMarketListItemSchema>

// MARKET LIST ITEM SCHEMAS

const createListItemSchema = z.object({
	name: z.string(),
	brand: z.string(),
	prices: z.object({
		type: z.string(),
		value: z.number(),
		unit: z.string()
	}).array(),
	quantity: z.number(),
	currency: z.string(),
	weight: z.string()
})

export type createListItemInput = z.infer<typeof createListItemSchema>;

const getListItemResponseSchema = z.object({
		marketListItem: MarketListItemSchema,
		prices: PriceSchema.array()
})

export type getListItemResponseType = z.infer<typeof getListItemResponseSchema>

const getMarketListItemParams = z.object({
		market_list_id: z.string(),
		market_list_item_id: z.string()
})

export type getMarketListItemParamsType = z.infer<typeof getMarketListItemParams>

export async function marketListRouter(app: FastifyTypedInstance) {
	app.post('/', {
		preHandler: [app.authenticate],
		schema: {
			tags: ['Market List'],
			description: 'Create a market list',
			body: createListSchema,
			response: {
				200: createMarketListSchema,
				401: z.object({
					message: z.string()
				})
			}	
		}
	}, marketListController.createList)

	//TODO:

	// app.get('/', {
	// 	preHandler: [app.authenticate],
	// 	schema: {

	// 	}
	// }, marketListController.getLists())

	app.get('/:market_list_id', {
		preHandler: [app.authenticate],
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

	app.delete('/:market_list_id', {
		preHandler: [app.authenticate],
		schema: {
			tags: ['Market List'],
			description: 'Delete a market list and his entire data',
			params: deleteListSchema,
		}
	}, marketListController.deleteList)

	app.get('/:market_list_id/items', {
		preHandler: [app.authenticate],
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

	app.post('/:market_list_id/items', {
		preHandler: [app.authenticate],
		schema: {
			tags: ['Market List Item'],
			description: 'Add an item to a market list',
			params: marketListSchema,
			body: createListItemSchema,
			response: {
				200: MarketListItemSchema
			}
		}
	}, marketListController.createItem)

	app.get('/:market_list_id/items/:market_list_item_id', {
		preHandler: [app.authenticate],
		schema: {
			tags: ['Market List Item'],
			description: 'Get an item of a market list',
			params: getMarketListItemParams,
			response: {
				200: getListItemResponseSchema
			}
		}
	}, marketListController.getItem)

	app.delete('/:market_list_id/items/:market_list_item_id', {
		preHandler: [app.authenticate],
		schema: {
			tags: ['Market List'],
			description: 'Delete an item of a market list',
			params: deleteMarketListItemSchema,
		}
	}, marketListController.deleteItem)
}