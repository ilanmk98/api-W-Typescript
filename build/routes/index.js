"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose = __importStar(require("mongoose"));
const bodyParser = __importStar(require("body-parser"));
const categoryModel_1 = require("../model/categoryModel");
const productModel_1 = __importDefault(require("../model/productModel"));
const category_1 = __importDefault(require("./category"));
const app = (0, express_1.default)();
const PORT = 3000;
app.use(bodyParser.urlencoded({
    extended: true
}));
mongoose.connect("mongodb://0.0.0.0:27017/dgcDB");
app.get('/', (_req, res) => {
    console.log("ping");
    res.send("pong");
});
app.use(category_1.default);
app.route("/product")
    .get((_req, res) => {
    productModel_1.default.find({ "category.enable": true })
        .then((foundItems) => {
        res.send(foundItems);
    })
        .catch((e) => {
        res.send(e.message);
    });
})
    .post((req, res) => {
    let isCate = new categoryModel_1.Category();
    categoryModel_1.Category.findOne({ title: req.body.catTitle })
        .then((foundItems => {
        if (foundItems === null) {
            throw new Error("There is no such category");
        }
        else {
            isCate.title = foundItems.title,
                isCate.enable = foundItems.enable;
            const product = new productModel_1.default({
                price: req.body.price,
                title: req.body.title,
                enable: req.body.enable,
                category: isCate
            });
            product.save()
                .then(() => {
                res.send(req.body);
            })
                .catch((e) => {
                res.send(e.message);
            });
        }
    }))
        .catch((e) => {
        console.log(e.message);
    });
});
app.listen(PORT, () => {
    console.log("Server running on port " + PORT);
});
