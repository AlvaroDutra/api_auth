import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { createUserSchema } from "../schemas/user.schema";
import * as argon2 from "argon2";

export const router = Router();
const prisma = new PrismaClient();

router.post('/auth/signin', async (req, res) => {
    try{

        const user = createUserSchema.parse(req.body);
        user.password = await argon2.hash(user.password);
        const userCreated = await prisma.user.create({
            data: user
        });
        delete userCreated.password;
        res.status(201).send(userCreated);
    }catch(e){
        res.status(400).send("Não foi possível criar usuario")
    }
});