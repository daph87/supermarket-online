const express = require("express");
const categoriesLogic = require("../bll/categories-logic");

const router = express.Router();

router.get("/", async (request, response) => {
    try {
        const categories = await categoriesLogic.getAllCategories();
        response.json(categories);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});

router.get("/:_id", async (request, response) => {
    try {
        const _id = request.params._id;
        const category = await categoriesLogic.getOneCategory(_id);
        response.json(category);
    }
    catch (err) {
        response.status(500).send(err.message);
    }
});


module.exports = router;