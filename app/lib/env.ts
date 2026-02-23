import { z } from "zod";
import "dotenv/config";

const envSchema = z.object({
    LASTFM_API_KEY: z.string().min(1),
    LASTFM_USERNAME: z.string().min(1),
});

export const env = envSchema.parse(process.env);