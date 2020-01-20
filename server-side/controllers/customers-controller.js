const express = require("express");
const customersLogic = require("../bll/customers-logic");

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const customers = await customersLogic.getAllCustomers();
        response.json(customers);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.post("/", async (request, response) => {
    try {
        const customer = request.body;
        const addedCustomer = await customersLogic.addCustomer(customer);
        response.status(201).json(addedCustomer);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const customer = await customersLogic.getOneCustomer(_id);
        response.json(customer);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;