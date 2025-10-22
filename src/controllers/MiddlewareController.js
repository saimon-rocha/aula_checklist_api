class MiddlewareController {
    static authMiddleware(req, res, next) {
        const authHeader = req.headers.authorization;
        if (!authHeader) return res.status(401).json({ message: "Token ausente" });

        const token = authHeader.split(" ")[1];
        try {
            const payload = jwt.verify(token, process.env.JWT_SECRET);
            req.user = payload;
            next();
        } catch (err) {
            return res.status(401).json({ message: "Token inválido" });
        }
    }
}

export default MiddlewareController;