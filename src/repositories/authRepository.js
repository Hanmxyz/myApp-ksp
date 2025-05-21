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
            const existingUser = await prisma.user.findUnique({
                where: {
                    username: String(data.username)
                }
            })
            if (existingUser !== null) {
                throw new Error("username sudah digunakan")
            }

            const hashedPassword = await hashPassword(data.password)

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