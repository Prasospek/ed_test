import jwt from "jsonwebtoken";

export const verifyToken = async (req, res, next) => {
    try {
        // from frontend we take authorization header
        let token = req.header("Authorization");

        if (!token) {
            return res.status(403).send("Access Denied");
        }

        if (token.startsWith("Bearer ")) {
            token = token.slice(7, token.length).trimStart();   // borec tu mel deprecated trimleft
        }

        const verified = jwt.verify(token, process.env.JWT_SECRET);
        req.user = verified;
        next();

    } catch (err) {
        res.status(500).json({error: "ERROR VERIFY TOKEN", err})
    }
}