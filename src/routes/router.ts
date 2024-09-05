import { Request, Response, Router } from "express";
import { body } from "express-validator";
import { handleInputErr } from "../modules/middleware";
import * as itemController from "../controllers/itemController";

const router = Router();

router.get("/", (_req, res) => {
    res.json(itemController.getAllItems());
});

router.get("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const item = itemController.getItemById(id);
    if (item) {
        res.json(item);
    } else {
        res.status(404).send("Item not found");
    }
});

router.post(
    "/",
    [body(["name", "description"]).isString().notEmpty()],
    handleInputErr,
    (req: Request, res: Response) => {
        const { name, description } = req.body;
        const newItem = itemController.createItem(name, description);
        res.status(201).json(newItem);
    }
);

router.put(
    "/:id",
    [body(["name", "description"]).isString().notEmpty()],
    handleInputErr,
    (req: Request, res: Response) => {
        const id = parseInt(req.params.id, 10);
        const { name, description } = req.body;
        const updatedItem = itemController.updateItem(id, name, description);
        if (updatedItem) {
            res.json(updatedItem);
        } else if (updatedItem === null) {
            res.status(400).send("No changes found");
        } else {
            res.status(404).send("Item not found");
        }
    }
);

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const success = itemController.deleteItem(id);
    if (success) {
        res.status(204).send();
    } else {
        res.status(404).send("Item not found");
    }
});

export default router;
