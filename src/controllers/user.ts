import { comparePswd, createJWT, hashPswd } from "../modules/auth";
import { Request, Response, NextFunction } from "express";
import db from "../data/data";

export const createNewUser = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    try {
        const { username, password } = req.body;

        const user = db.createUser({
            username,
            password: await hashPswd(password),
        });
        const token = createJWT(user);
        res.json({ token });
    } catch (e) {
        // e.type = "input"
        res.status(500).send("Internal Server Error");
        next(e);
    }
};

export const signIn = async (req: Request, res: Response) => {
    const user = db.findUserByUsername(req.body.username);
    console.log(user);
    if (user === undefined) {
        res.status(401).json({ message: "User not found" });
        return;
    }
    const isValid = await comparePswd(req.body.password, user.password);

    if (!isValid) {
        res.status(401).json({ message: "Incorrect password" });
        return;
    }

    res.json("Logged in");
};
