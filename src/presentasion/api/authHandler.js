import jwt from "jsonwebtoken"
import { verifyPassword } from "../../lib/passwordHash.js"
import * as env from "dotenv"

env.config()

export default class AuthHandler {
    constructor(authUsecase) {
        this.authUsecase = authUsecase
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await this.authUsecase.login(username)
            const passwordValid = await verifyPassword(password, user.password)

            const isProduction = process.env.NODE_ENV === "production"

            if (username === user.username && passwordValid) {
                const token = jwt.sign({ userId: user.id, name : user.name ,username,  role : user.role }, 'secret1234', { expiresIn: '24h' })

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: isProduction,
                    sameSite: isProduction ? "none" : "strict",
                    domain: isProduction ? process.env.FE_SITE : undefined,
                    maxAge: 1440 * 60 * 1000
                })

                res.json({ message: 'Login berhasil', role: user.role.name });
            }
        } catch (error) {
            res.status(401).json({ message: 'Username atau password salah' });
        }
    }

    async logout(req, res) {
        const isProduction = process.env.NODE_ENV === "production"

        res.clearCookie('token', {
            httpOnly: true,
            secure: isProduction, // set to true if you're using HTTPS
            sameSite: isProduction ? "none" : "strict",
            domain: isProduction ? process.env.FE_SITE : undefined,
        });
        res.send('Cookie cleared');
    }

    async signup(req, res) {
        try {
            const data = req.body
            const result = await this.authUsecase.signup(data)
            res.json(result)
        } catch (error) {
            res.status(500).json({ message: error })
        }
    }

    async session(req, res) {
        const token = req.cookies.token;
        if(!token) return res.status(401).json({ message : "not logged in"});

        try {
            const user = jwt.verify(token, 'secret1234')
            res.json({ user })
        } catch (error) {
            req.status(401).json({ message : "invalid token"})
        }
    }

}
