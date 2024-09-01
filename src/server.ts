import express, { Express, Request, Response, NextFunction } from "express";
import itemsRouter from "./routes/router";

const app: Express = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/items", itemsRouter);

app.get("/", (req, res, next) => {
    res.status(200);
    res.json({ message: "hello" });
    next();
});

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
    if (err.type === "auth") {
        res.status(401).json({ message: "unauthorized" });
    } else if (err.type === "input") {
        res.status(400).json({ message: "invalid input" });
    } else {
        res.status(500).json({ message: "something went wrong" });
    }
});
export default app;
