const mongoose = require("mongoose");

// Create a schema for a cart: 
const cartSchema = mongoose.Schema({
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    creationDate: String,


}, { versionKey: false });

const Cart = mongoose.model("Cart", cartSchema, "carts"); // Model, Schema, Collection



function getCartFromSpecificUser(_id) {
    return new Promise((resolve, reject) => {
        Cart.find({ customerID: { _id } }).populate("customerID").exec((err, cart) => {
            if (err) return reject(err);
            resolve(cart);
        });
    });
}

function getAllCarts() {
    return new Promise((resolve, reject) => {


        Cart.find({}).populate("customerID").exec((err, carts) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(carts);
        });
    });
}

function addCart(cart) {
    return new Promise((resolve, reject) => {
        const oneCart = new Cart(cart);
        oneCart.save((err, oneCart) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(oneCart);
        });
    });
}

function deleteCart(_id) {
    return new Promise((resolve, reject) => {
        Cart.deleteOne({ _id }, (err, info) => {
            if (err) {
                reject(err);
                return;
            }
            resolve();
        });
    });
}


module.exports = {
    getAllCarts,
    getCartFromSpecificUser,
    addCart,
    deleteCart
};