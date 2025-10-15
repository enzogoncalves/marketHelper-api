import { z } from "zod";

export const textExtractionSchema = z.object({
    image: z.any(),
});
