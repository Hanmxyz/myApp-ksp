import { prisma } from "../../server.js"
import { hashPassword } from "../lib/passwordHash.js";

export default class AuthRepository {

    async login(data) {
       try {
             const username = String(data || "").trim();

        if (!username) {
            throw new Error("Username is required and must be a non-empty string");
        }

        return await prisma.user.findUnique({
            where: {
                username: username
            },
            include: {
                role: true
            }
        });
       } catch (error) {
            throw error
       }
    }

    async signup(data) {
        try {
            console.log(data.username)
            const existingUser = await prisma.user.findUnique({
                where: {
                    username: String(data.username)
                }
            })
            console.log(existingUser)
            if (existingUser !== null) {
                throw new Error("username sudah digunakan")
            }

            const hashedPassword = await hashPassword(data.password)
            console.log(hashPassword)

            return await prisma.user.create({
                data: {
                    name: String(data.name),
                    username: String(data.username),
                    password: String(hashedPassword),
                    roleId : data.roleId
                }
            })
        } catch (error) {
            console.error("Terjadi error saat signup:", error)
            throw error
        }
    }

}