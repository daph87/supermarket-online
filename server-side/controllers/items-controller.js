const express = require("express");
const itemsLogic = require("../bll/items-logic")
const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const items = await itemsLogic.getAllItems();
        response.json(items);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/:_id", async (request, response) => {
    try {
        const id = request.params._id;
        const items = await itemsLogic.getAllItemsFromOneCart(id);
        response.json(items);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



router.post("/", async (request, response) => {
    try {
        const item = request.body;
        const addedItem = await itemsLogic.addItem(item);
        response.status(201).json(addedItem);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await itemsLogic.deleteItem(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.delete("/carts/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await itemsLogic.deleteAllItemsFromOneCart(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.patch("/:_id", async (req, res) => {
    try {
        const id = req.params._id;
        const item = req.body;
        item._id = id;
        const newItem = await itemsLogic.updateItem(item);
        res.json(newItem);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
})


module.exports = router