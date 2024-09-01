import { Router } from "express";
import * as itemController from "../controllers/itemController";

const router = Router();

router.get("/", (req, res) => {
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

router.post("/", (req, res) => {
    const { name, description } = req.body;
    const newItem = itemController.createItem(name, description);
    res.status(201).json(newItem);
});

router.put("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const { name, description } = req.body;
    const updatedItem = itemController.updateItem(id, name, description);
    if (updatedItem) {
        res.json(updatedItem);
    } else {
        res.status(404).send("Item not found");
    }
});

router.delete("/:id", (req, res) => {
    const id = parseInt(req.params.id, 10);
    const succes = itemController.deleteItem(id);
    if (succes) {
        res.status(204).send();
    } else {
        res.status(404).send("Item not found");
    }
});

export default router;
