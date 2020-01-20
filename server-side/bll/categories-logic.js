const mongoose = require("mongoose");

// Create Schema for one category

const categorySchema = mongoose.Schema({
    categoryName: String,
}, { versionKey: false });

const Category = mongoose.model("Category", categorySchema, "categories");


// Get All Categories
function getAllCategories() {

    return new Promise((resolve, reject) => {
        Category.find({}, (err, categories) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(categories);
        });
    });
}

function getOneCategory(_id) {
    return new Promise((resolve, reject) => {
        Category.findById(_id, (err, category) => {
            if (err) return reject(err);
            resolve(category);
        });
    });
}


module.exports = {
    getAllCategories,
    getOneCategory
}
