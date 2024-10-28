import z from "zod";

export const createUserSchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(8),
    role: z.string().min(1)
});

export const loginUserSchema = z.object({
    email: z.string().email().min(1),
    password: z.string().min(8)
});