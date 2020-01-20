const mongoose = require("mongoose");


// Create a schema for a customer
const customerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    phoneNumber: Number,
    password: String,
    city: String,
    street: String,
    houseNumber: Number,

}, { versionKey: false });

const Customer = mongoose.model("Customer", customerSchema, "customers"); // Model, Schema, Collection

function getAllCustomers() {
    return new Promise((resolve, reject) => {
        Customer.find({}, (err, customers) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(customers);
        });
    });
}

function getOneCustomer(_id) {
    return new Promise((resolve, reject) => {
        Customer.findById(_id, (err, customer) => {
            if (err) return reject(err);
            resolve(customer);
        });
    });
}

function addCustomer(customer) {
    return new Promise((resolve, reject) => {
        const cust = new Customer(customer);
        cust.save((err, cust) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(cust);
        });
    });
}

module.exports = {
    addCustomer,
    getAllCustomers,
    getOneCustomer
}