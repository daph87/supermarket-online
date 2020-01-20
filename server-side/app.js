const express = require("express");
const cors = require("cors");
const productsController = require("./controllers/products-controller");
const customersController = require("./controllers/customers-controller");
const categoriesController = require("./controllers/categories-controller");
const cartsController = require("./controllers/carts-controller");
const itemsController = require("./controllers/items-controller");
const ordersController = require("./controllers/orders-controller");
const citiesController = require("./controllers/cities-controller");
const managersController = require("./controllers/managers-controller");
const fs= require("fs");
const productsLogic = require("./bll/products-logic");
const server = express();
const path = require("path");
const multer = require("multer");



server.use(cors());
server.use(express.json());
server.use("/api/products", productsController);
server.use("/api/customers", customersController);
server.use("/api/categories", categoriesController);
server.use("/api/carts",cartsController);
server.use("/api/items", itemsController);
server.use("/api/orders", ordersController);
server.use("/api/cities", citiesController);
server.use("/api/managers", managersController)
server.use(express.static(__dirname));

let upload = multer({dest:__dirname+ `\\assets`});
server.post("/upload-image",upload.single("myImage"),(request, response)=>{
    let newObj= JSON.parse(request.body.newProduct);
    const fileExtension = path.extname(request.file.originalname);
    const multerFileName = request.file.destination + "\\" + request.file.filename;
    const finalFileName = multerFileName + fileExtension;

    fs.rename(multerFileName,finalFileName,err =>{
        if(err){
            response.status(500).json(err);
            return;
        }
        response.send("Done");
    });
    try{
        newObj.pictureName = request.file.filename + fileExtension;
        productsLogic.addProduct(newObj);
    }
    catch(err){
        console.log(err);
    }
});


server.patch("/update-image-name",upload.single("myImage"),(req, res)=>{
    console.log(req.body);
    console.log(req.file);
    const fileExtension = path.extname(req.file.originalname);
    const multerFileName = req.file.destination + "\\" + req.file.filename;
    const finalFileName = multerFileName + fileExtension;

    fs.rename(multerFileName,finalFileName,err =>{
        if(err){
            res.status(500).json(err);
            return;
        }
        res.send("Done");
    });
    try{
        const newImg = {
            _id: req.body.product_id, pictureName: req.file.filename + fileExtension
        };
        console.log(newImg);
        productsLogic.updateProduct(newImg);
        
        fs.unlinkSync(`${__dirname}\\assets\\${req.body.theProduct}`);
       
    }
    catch(err){
        console.log(err);
    }
});



server.listen(3000, () => console.log("Listening on http://localhost:3000"));

