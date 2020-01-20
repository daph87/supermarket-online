const express = require("express");
const managersLogic = require("../bll/managers-logic");

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const managers = await managersLogic.getAllManagers();
        response.json(managers);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const manager = await managersLogic.getOneManager(_id);
        response.json(manager);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;