const express = require("express");
const cartsLogic = require("../bll/carts-logic");

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const carts = await cartsLogic.getAllCarts();
        response.json(carts);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});



router.post("/", async (request, response) => {
    try {
        const cart = request.body;
        const addedCart = await cartsLogic.addCart(cart);
        response.status(201).json(addedCart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});





router.get("/:_id", async (request, response) => {
    try {
        const user_id = request.params._id;
        const cart = await cartsLogic.getCartFromSpecificUser(user_id);
        response.json(cart);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.delete("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        await cartsLogic.deleteCart(_id);
        response.sendStatus(204);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

module.exports = router;