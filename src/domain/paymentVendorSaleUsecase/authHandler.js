import jwt from "jsonwebtoken"

export default class AuthHandler {
    constructor(authUsecase) {
        this.authUsecase = authUsecase
    }

    async login(req, res) {
        const { username, password } = req.body
        const user = await this.authUsecase.login(username)

        if (username === user.username && password === user.password) {
            const token = jwt.sign({ username }, 'secret1234', { expiresIn: '1H' })

            res.cookie('token', token, {
                httpOnly: true,
                secure: false,
                sameSite: 'Strict',
                maxAge: 60 * 60 * 1000
            })

            res.json({ message: 'Login berhasil' });
        } else {
            res.status(401).json({ message: 'Username atau password salah' });
        }
    }

}
