import z from "zod";

export const createUserSchema = z.object({
    name: z.string().min(8),
    email: z.string().email(),
    password: z.string().min(8)
})