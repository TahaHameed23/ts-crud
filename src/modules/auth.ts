import { User } from "../models";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { Request, Response, NextFunction } from "express";

const SECRET_KEY = process.env.JWT_KEY as jwt.Secret;

export const comparePswd = (
    password: string,
    hash: string
): Promise<boolean> => {
    return bcrypt.compare(password, hash);
};

export const hashPswd = (password: string): Promise<string> => {
    return bcrypt.hash(password, 5); //<- salt(5)
};

export const createJWT = (user: User): string => {
    const token: string = jwt.sign(
        {
            id: user.id,
            username: user.username,
        },
        SECRET_KEY
    );

    return token;
};

export const protect = (
    req: Request & { user?: jwt.JwtPayload },
    res: Response,
    next: NextFunction
) => {
    const bearer = req.headers.authorization;

    if (!bearer) {
        res.status(401);
        res.status(401).json({ message: "Authorization header missing" });
        return;
    }

    const [, token] = bearer.split(" ");

    if (!token) {
        res.status(401);
        res.status(401).json({
            message: "Token missing in authorization header",
        });
        return;
    }

    try {
        const user = jwt.verify(token, SECRET_KEY) as jwt.JwtPayload;
        req.user = user;
        next();
    } catch (e) {
        console.error("Token verification error:", e);
        res.status(401).json({ message: "Invalid token" });
        return;
    }
};
