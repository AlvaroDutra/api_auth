import z from "zod";

export const createUserSchema = z.object({
    name: z.string().min(8),
    email: z.string().email(),
    password: z.string().min(8)
});

export const loginUserSchema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(8)
});