const mongoose = require("mongoose");

// Create a schema for a city: 
const citySchema = mongoose.Schema({
    name: String,
   
}, { versionKey: false });

const City = mongoose.model("City", citySchema, "cities"); // Model, Schema, Collection



function getAllCities() {
    return new Promise((resolve, reject) => {
        City.find({}, (err, cities) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(cities);
        });
    });
}


// function getOneCity(_id) {
//     return new Promise((resolve, reject) => {
//         City.findById(_id, (err, city) => {
//             if (err) return reject(err);
//             resolve(city);
//         });
//     });
// }





module.exports = {
    getAllCities,
    // getOneCity,
   

};