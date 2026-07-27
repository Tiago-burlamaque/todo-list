import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export function authMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
) {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: "Token não informado."
        });
    }

    const [, token] = authHeader.split(" ");

    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        throw new Error("JWT_SECRET não definida.");
    }

    try {
        jwt.verify(token, jwtSecret);

        next();
    } catch {
        return res.status(401).json({
            message: "Token inválido ou expirado."
        });
    }
}