"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const categoryModel_1 = require("./categoryModel");
const ProductSchema = new mongoose_1.default.Schema({
    price: { type: Number, required: true },
    title: { type: String, required: true },
    enable: { type: Boolean, required: true },
    category: { type: categoryModel_1.CategorySchema, required: true }
});
const Product = mongoose_1.default.model('Product', ProductSchema);
exports.default = Product;
