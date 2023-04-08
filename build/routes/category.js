"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const categoryModel_1 = require("../model/categoryModel");
const router = express_1.default.Router();
router.route("/category")
    .get((_req, res) => {
    categoryModel_1.Category.find({})
        .then((foundItems => {
        res.send(foundItems);
    }))
        .catch((e) => {
        console.log(e);
    });
})
    .post((req, res) => {
    const category = new categoryModel_1.Category({
        title: req.body.title,
        enable: req.body.enable
    });
    category.save()
        .then(() => {
        res.send(req.body);
    })
        .catch((e) => {
        res.send(e.message);
    });
});
router.patch("/");
router.delete("/");
exports.default = router;
