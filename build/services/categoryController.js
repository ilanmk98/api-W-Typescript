"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCategories = exports.addCategory = void 0;
const categoryModel_1 = __importDefault(require("../model/categoryModel"));
function addCategory(title, enable) {
    return __awaiter(this, void 0, void 0, function* () {
        const category = new categoryModel_1.default({
            title: title,
            enable: enable
        });
        yield category.save();
        console.log(category + " added successfully");
    });
}
exports.addCategory = addCategory;
function getCategories() {
    return __awaiter(this, void 0, void 0, function* () {
        let categories;
        categoryModel_1.default.find({})
            .then((foundItems => {
            categories = foundItems;
        }));
    });
}
exports.getCategories = getCategories;
exports.default = addCategory;
