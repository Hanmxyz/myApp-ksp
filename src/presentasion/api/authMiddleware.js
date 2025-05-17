import jwt from "jsonwebtoken"

const AuthMiddleware = (req, res, next) => {
    const token = req.cookies.token

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized' })
    }

    try {
        const decoded = jwt.verify(token, 'secret1234');
        req.user = decoded;
        next();
    } catch (err) {
        return res.status(403).json({ message: 'Forbidden' });
    }
}

export default AuthMiddleware