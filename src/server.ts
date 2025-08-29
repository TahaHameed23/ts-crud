import express from "express";
import { createServer } from "node:http";

export const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("OK");
});
