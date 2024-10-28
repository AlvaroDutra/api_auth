import { PrismaClient } from "@prisma/client";
import { Router } from "express";
import { createUserSchema, loginUserSchema } from "../schemas/user.schema";
import * as argon2 from "argon2";
import * as jwt from "jsonwebtoken";

export const router = Router();
const prisma = new PrismaClient();

router.post('/auth/signup', async (req, res) => {
    try{
        const user = createUserSchema.parse(req.body);
        user.password = await argon2.hash(user.password);
        const userCreated = await prisma.user.create({
            data: user
        });
        delete userCreated.password;
        res.status(201).send(userCreated);
    }catch(e){
        res.status(500).send("Não foi possível criar usuario")
        throw e;
    }
});

router.put('/auth/signin', async (req, res) => {
    try {
        const {email, password} = loginUserSchema.parse(req.body);
        
        const userExists = await prisma.user.findUnique({
            where: {
                email
            }
        });

        if(!userExists || !(await argon2.verify(userExists.password, password))){
            res.status(403).send("Unauthorized");
        }

        const token = jwt.sign({email: userExists.email}, process.env.JWT_SECRET,{expiresIn: '1h'});

        res.status(200).send(token);
    } catch (error) {
        console.log(error)
        res.status(500).send({error:"Não foi possível logar"})
    }
});