import z from "zod";
import { FastifyTypedInstance } from "../../utils/types";
import { MarketListItemSchema } from "../../../prisma/generated/zod";
import { marketListItemController } from "./marketListItem_controller";
import { authMiddleware } from "../../middlewares/auth";

const createListItemSchema = z.object({
	name: z.string(),
	price: z.number(),
	quantity: z.number(),
	marketList_id: z.string()
})

export type createListItemInput = z.infer<typeof createListItemSchema>;

const getMarketListItemQuery = z.object({
		marketList_id: z.string(),
		marketListItem_id: z.string()
})

export type getMarketListItemQueryType = z.infer<typeof getMarketListItemQuery>

export function marketListItemRouter(app: FastifyTypedInstance) {
	app.post('/', {
		preHandler: [authMiddleware],
		schema: {
			tags: ['Market List Item'],
			description: 'Add an item to a market list',
			body: createListItemSchema,
			response: {
				200: MarketListItemSchema
			}
		}
	}, marketListItemController.create)

	app.get('/', {
		preHandler: [authMiddleware],
		schema: {
			tags: ['Market List Item'],
			description: 'Get an item of a market list',
			querystring: getMarketListItemQuery,
			response: {
				200: MarketListItemSchema
			}
		}
	}, marketListItemController.getItem)


}