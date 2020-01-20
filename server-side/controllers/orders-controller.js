const express = require("express");
const ordersLogic = require("../bll/orders-logic")
const router = express.Router();


router.post("/", async (request, response) => {
    try {
        const order = request.body;
        const addedOrder = await ordersLogic.addOrder(order);
        response.status(201).json(addedOrder);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/", async (request, response) => {
    try {
        const order = await ordersLogic.getAllOrders();
        response.json(order);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/customers/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const order = await ordersLogic.gelAllOrdersOfOneCustomer(_id);
        response.json(order);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const order = await ordersLogic.getOneOrder(_id);
        response.json(order);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await ordersLogic.deleteOrder(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router