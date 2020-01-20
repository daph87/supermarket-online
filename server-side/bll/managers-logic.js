const mongoose = require("mongoose");


// Create a schema for a manager
const managerSchema = mongoose.Schema({
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    

}, { versionKey: false });

const Manager = mongoose.model("Manager", managerSchema, "managers"); // Model, Schema, Collection


function getAllManagers() {
    return new Promise((resolve, reject) => {
        Manager.find({}, (err, managers) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(managers);
        });
    });
}


function getOneManager(_id) {
    return new Promise((resolve, reject) => {
        Manager.findById(_id, (err, manager) => {
            if (err) return reject(err);
            resolve(manager);
        });
    });
}


module.exports = {
    getAllManagers,
    getOneManager
    
}