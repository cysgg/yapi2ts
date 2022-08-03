"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTypeStr = void 0;
const uppercamelcase = require("uppercamelcase");
const interface_type = "interface";
const array_type = "array";
const type_type = "type";
const getDescription = function (prefix, desc) {
    if (desc) {
        return `${prefix}// ${desc}
`;
    }
};
const getTypeStr = function (prefix, desc, name, midSuffix, type) {
    const descStr = desc ? getDescription(prefix, desc) : "";
    return `${descStr}${prefix}${name}${midSuffix} ${type};`;
};
exports.getTypeStr = getTypeStr;
const getInterfaceName = function (name) {
    return `export interface ${name} {`;
};
const getInterfaceTypeItem = function (prefix = "", value, name, type, desc, isRequired) {
    const midSuffix = isRequired ? ":" : "?:";
    let tsTypes = [value];
    if (Array.isArray(value)) {
        tsTypes = value;
    }
    if (type === "array") {
        tsTypes = tsTypes.map((v) => `${v}[]`);
    }
    if (!type) {
        tsTypes = ["any"];
    }
    return (0, exports.getTypeStr)(prefix, desc, name, midSuffix, tsTypes.join(" | "));
};
const getInterfaceBody = function (body, requiredList) {
    if (!body.length) {
        return "// interface no properties";
    }
    return body.map((item) => {
        const { value, name, type, desc } = item;
        let isRequired = false;
        if (requiredList && requiredList.length) {
            isRequired = requiredList.includes(name);
        }
        return getInterfaceTypeItem("  ", value, name, type, desc, isRequired);
    });
};
const getTypeArrayData = function (node, interfaceList) {
    const { name, children, description } = node;
    const [child] = children;
    const { type } = child;
    let value = type;
    if (type === "object") {
        child.name = name;
        const { name: interfaceName } = dfsGetNode(child, interfaceList);
        value = uppercamelcase(interfaceName);
    }
    const desc = description;
    return {
        name: name,
        desc,
        type: array_type,
        value,
    };
};
const getTypeObjectData = function (node, interfaceList) {
    const { name, children, requiredList, description } = node;
    const interfaceName = uppercamelcase(name);
    const desc = description;
    const interfaceBody = children.map((child) => dfsGetNode(child, interfaceList));
    const interfaceDefined = {
        name: interfaceName,
        body: interfaceBody,
        requiredList: requiredList,
        desc,
    };
    interfaceList.push(interfaceDefined);
    return {
        name,
        value: interfaceName,
        type: interface_type,
    };
};
const getTypeBasicData = function (node) {
    const { name, type, description } = node;
    const desc = description;
    return {
        name: name,
        desc,
        type: type_type,
        value: type,
    };
};
const dfsGetNode = function (treeNode, interfaceList) {
    const { type } = treeNode;
    switch (type) {
        case "array":
            return getTypeArrayData(treeNode, interfaceList);
        case "object":
            return getTypeObjectData(treeNode, interfaceList);
        default:
            return getTypeBasicData(treeNode);
    }
};
const renderItem = function (inter) {
    const { name, body, requiredList, desc } = inter;
    const interfaceList = [getDescription("", desc)];
    const interName = getInterfaceName(name);
    interfaceList.push(interName);
    const interBody = getInterfaceBody(body, requiredList);
    const interfaceAll4oneList = interfaceList.concat(interBody);
    const interstr = interfaceAll4oneList.join("\n") + "\n}";
    return interstr;
};
const renderInterface = function (interfaces) {
    if (!renderInterface.length) {
        return `// no data`;
    }
    return interfaces.map(renderItem).join("\n");
};
function default_1(tree) {
    const interfaceList = [];
    dfsGetNode(tree, interfaceList);
    const interfaceContent = renderInterface(interfaceList);
    return interfaceContent;
}
exports.default = default_1;
//# sourceMappingURL=transform.js.map