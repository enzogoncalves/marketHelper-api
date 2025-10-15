import { z } from "zod";

export const getUserSchema = z.object({
    id: z.string(),
});

export const updateUserSchema = z.object({
    id: z.string(),
    email: z.string().email().optional(),
    password: z.string().min(6).optional(),
});

export const deleteUserSchema = z.object({
    id: z.string(),
});

export const createUserSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});
