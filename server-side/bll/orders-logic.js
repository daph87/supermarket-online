const mongoose = require("mongoose");


// Create a schema for an order: 
const orderSchema = mongoose.Schema({
    customerID: { type: mongoose.Schema.Types.ObjectId, ref: "Customer" },
    cartID: { type: mongoose.Schema.Types.ObjectId, ref: "Cart" },
    finalPrice: Number,
    deliveryCity: String,
    deliveryStreet: String,
    deliveryDate: String, 
    houseNumber: Number,
    creditCardNumber : Number,

}, { versionKey: false });

const Order = mongoose.model("Order", orderSchema, "orders"); // Model, Schema, Collection

function getAllOrders() {
    return new Promise((resolve, reject) => {

        Order.find({}).exec((err, orders) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(orders);
        });
    });
}

function gelAllOrdersOfOneCustomer(_id) {
    return new Promise((resolve, reject) => {
        Order.find({ customerID: { _id } }).populate("customerID").populate("cartID").exec((err, orders) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(orders);
        })
    });
}




function getOneOrder(_id) {
    return new Promise((resolve, reject) => {
        Order.findById(_id).populate("customerID").populate("cartID").exec((err, order) => {
            if (err) return reject(err);
            resolve(order);
        });
    });
}

function addOrder(order) {
    return new Promise((resolve, reject) => {
        const orderToAdd = new Order(order);
        orderToAdd.save((err, orderToAdd) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(orderToAdd);
        });
    });
}


function deleteOrder(_id) {
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
    getOneOrder,
    addOrder,
    deleteOrder,
    getAllOrders,
    gelAllOrdersOfOneCustomer

};