"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../config/index");
const { children_str, array_items_str, required_str, description_str, type_str, } = index_1.default;
const resovleTypeArrayData = function (name, data, typeStrList) {
    const itemData = data[array_items_str];
    const description = data[description_str];
    const arrDictionary = {
        name,
        type: "array",
        description,
        children: null,
    };
    const list = [];
    resolveTypeFunc(array_items_str, itemData, list);
    arrDictionary.children = list;
    typeStrList.push(arrDictionary);
};
const resovleTypeObjectData = function (objName, data, typeStrList) {
    const childrenData = data[children_str];
    const description = data[description_str];
    const requiredList = data[required_str];
    const objDictionary = {
        name: objName,
        type: "object",
        description,
        requiredList,
        children: null,
    };
    const list = [];
    const keys = Object.keys(childrenData);
    keys.forEach((name) => {
        resolveTypeFunc(name, childrenData[name], list);
    });
    objDictionary.children = list;
    typeStrList.push(objDictionary);
};
const resovleTypeBasicData = function (name, data, typeStrList) {
    const type = data[type_str];
    const description = data[description_str];
    const basicDictionary = {
        name,
        type,
        description,
    };
    typeStrList.push(basicDictionary);
};
const resolveTypeFunc = function (name, data, typeStrList) {
    const type = data[type_str];
    switch (type) {
        case "array":
            resovleTypeArrayData(name, data, typeStrList);
            break;
        case "object":
            resovleTypeObjectData(name, data, typeStrList);
            break;
        default:
            resovleTypeBasicData(name, data, typeStrList);
            break;
    }
};
function default_1(name, define) {
    if (!define) {
        console.log("no value");
    }
    const typeStrList = [];
    resolveTypeFunc(name, define, typeStrList);
    return typeStrList;
}
exports.default = default_1;
//# sourceMappingURL=collect.js.map