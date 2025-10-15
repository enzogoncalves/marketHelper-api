import { z } from "zod";

export const imageDetectionSchema = z.object({
    image: z.any(),
});
