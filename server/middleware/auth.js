import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
dotenv.config();

const auth = (req, res, next) => {
    try {
        const authorization = req.headers.authorization;

        if (!authorization) {
            return res.status(401).json({ error: true, message: 'Unauthorized access: Missing authorization header' });
        }

        const token = authorization.split(' ')[1];

        if (!token) {
            return res.status(403).json({ error: true, message: 'Token is missing from Authorization header' });
        }

        const isCustomAuth = token.length < 500;

        let decodedData;
      //   console.log(isCustomAuth)
        if (isCustomAuth) {
            // Use the secret key from environment variables
            const secret = process.env.ACCESS_TOKEN_SECRET;
            if (!secret) {
                console.error('ACCESS_TOKEN_SECRET not defined');
                throw new Error('ACCESS_TOKEN_SECRET not defined');
            }
            decodedData = jwt.verify(token, secret); // For custom JWT
            req.userId = decodedData?.id;
        } else {
            decodedData = jwt.decode(token);  // Google OAuth token
            req.userId = decodedData?.sub;  // 'sub' is the identifier in Google tokens
        }

        next();
    } catch (error) {
        console.error("Authorization error:", error.message);
        return res.status(500).json({ error: true, message: "Server Error: Failed to authenticate" });
    }
};

export default auth;
