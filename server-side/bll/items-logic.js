const mongoose = require("mongoose");

// Create a schema for a product: 
const itemSchema = mongoose.Schema({
    productID: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
    amount: Number,
    totalPrice: Number,
    cartID: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" }



}, { versionKey: false });

const Item = mongoose.model("Item", itemSchema, "cartItems"); // Model, Schema, Collection



function getAllItems() {
    return new Promise((resolve, reject) => {


        Item.find().populate("productID").populate("cartID").exec((err, items) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(items);
        });
    });
}


function getAllItemsFromOneCart(_id) {
    return new Promise((resolve, reject) => {


        Item.find({ cartID: { _id } }).populate("productID").populate("cartID").exec((err, items) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(items);
        });
    });
}

function updateItem(item) {
    return new Promise((res, rej) => {
        const newItem = new Item(item);
        Item.updateOne({ _id: item._id }, newItem, (err, info) => {
            if (err) return rej(err);
            res(newItem)
        })
    })

}

function addItem(item) {
    return new Promise((resolve, reject) => {
        const itemToAdd = new Item(item);
        itemToAdd.save((err, itemToAdd) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(itemToAdd);
        });
    });
}



function deleteItem(_id) {
    return new Promise((resolve, reject) => {
        Item.deleteOne({ _id }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}

function deleteAllItemsFromOneCart(_id) {
    return new Promise((resolve, reject) => {
        Item.remove({ cartID: { _id } }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}


module.exports = {
    getAllItems,
    addItem,
    deleteItem,
    deleteAllItemsFromOneCart,
    getAllItemsFromOneCart,
    updateItem
};