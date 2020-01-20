const mongoose = require("mongoose");

// Connect to the database: 
mongoose.connect("mongodb://localhost:27017/supermarket",
    { useNewUrlParser: true, useUnifiedTopology: true }, (err, mongoClient) => {
        if (err) {
            console.log(err);
            return;
        }
        console.log("We're connected to " + mongoClient.name + " database on MongoDB...");
    });



// Create a schema for a product: 
const productSchema = mongoose.Schema({
    productName: String,
    categoryID: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    price: Number,
    pictureName: String

}, { versionKey: false });

const Product = mongoose.model("Product", productSchema, "products"); // Model, Schema, Collection



function getAllProducts() {
    return new Promise((resolve, reject) => {


        Product.find({}).populate("categoryID").exec((err, products) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(products);
        });
    });
}

function getAllProductsOfOneCategory(_id) {
    return new Promise((resolve, reject) => {
        Product.find({ categoryID: { _id } }).populate("categoryID").exec((err, products) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(products);
        })
    });

}

function getOneProduct(_id) {
    return new Promise((resolve, reject) => {
        Product.findById(_id, (err, product) => {
            if (err) return reject(err);
            resolve(product);
        });
    });
}

function addProduct(product) {
    return new Promise((resolve, reject) => {
        const prod = new Product(product);
        prod.save((err, prod) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(prod);
        });
    });
}

function updateProduct(product) {
    return new Promise((resolve, reject) => {
        const prod = new Product(product);
        Product.updateOne({ _id: product._id }, prod, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(prod);
        });
    });
}

function deleteProduct(_id) {
    return new Promise((resolve, reject) => {
        Product.deleteOne({ _id }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}


module.exports = {
    getAllProducts,
    getOneProduct,
    addProduct,
    updateProduct,
    deleteProduct,
    getAllProductsOfOneCategory
};