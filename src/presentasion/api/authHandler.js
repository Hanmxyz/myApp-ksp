import jwt from "jsonwebtoken"
import { verifyPassword } from "../../lib/passwordHash.js"

export default class AuthHandler {
    constructor(authUsecase) {
        this.authUsecase = authUsecase
    }

    async login(req, res) {
        try {
            const { username, password } = req.body
            const user = await this.authUsecase.login(username)
            const passwordValid = await verifyPassword(password, user.password)

            if (username === user.username && passwordValid) {
                const token = jwt.sign({ username, userId : user.id }, 'secret1234', { expiresIn: '1H' })

                res.cookie('token', token, {
                    httpOnly: true,
                    secure: false,
                    sameSite: 'Strict',
                    maxAge: 60 * 60 * 1000
                })

                res.json({ message: 'Login berhasil', role : user.role.name });
            }
        } catch (error) {
            res.status(401).json({ message: 'Username atau password salah' });
        }
    }

    async logout(req, res) {
        res.clearCookie('token', {
            httpOnly: true,
            secure: false, // set to true if you're using HTTPS
            sameSite: 'strict' // or 'lax' / 'none' depending on your needs
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

}
