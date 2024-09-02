import { validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";
export const handleInputErr = (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        res.status(400); //bad req, u dont send ryt things
        res.json({ errors: errors.array() });
    } else {
        next();
    }
};
