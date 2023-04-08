"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const parseTitle = (titleFromRequest) => {
    if (!isString(titleFromRequest)) {
        throw new Error('incorrect or missing title');
    }
    return titleFromRequest;
};
const parseEnable = (enableFromRequest) => {
    if (!isBoolean(enableFromRequest)) {
        throw new Error('Incorrect or missing title');
    }
    return enableFromRequest;
};
const isBoolean = (boolean) => {
    return typeof boolean === 'boolean';
};
const isString = (string) => {
    return typeof string === 'string';
};
const toNewCategory = (object) => {
    const newCategory = {
        title: parseTitle(object.title),
        enable: parseEnable(object.enable)
    };
    return newCategory;
};
exports.default = toNewCategory;
