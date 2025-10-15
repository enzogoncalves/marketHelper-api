import { z } from "zod";

export const createMarketListSchema = z.object({
    title: z.string(),
});

export const getMarketListSchema = z.object({
    id: z.string(),
});

export const updateMarketListSchema = z.object({
    id: z.string(),
    title: z.string(),
});

export const deleteMarketListSchema = z.object({
    id: z.string(),
});

export const marketListItemSchema = z.object({
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
});

export const deleteMarketListItemSchema = z.object({
    market_list_id: z.string(),
    market_list_item_id: z.string()
});

export const getMarketListItemParams = z.object({
    market_list_id: z.string(),
    market_list_item_id: z.string()
});
