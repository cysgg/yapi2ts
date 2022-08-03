"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YAPI_TREE_INTERFACE_MAP = exports.INTERFACE_LIST_MAP = exports.INTERFACE_SHOW_LIST = exports.INTERFACE_STATUS_OBJ = void 0;
exports.INTERFACE_STATUS_OBJ = {
    undone: {
        value: "undone",
        label: "开发中",
        color: "#DA0000",
    },
    testing: {
        value: "testing",
        label: "测试中",
        color: "#FAAD14",
    },
    pre_production: {
        value: "pre_production",
        label: "预发布中",
        color: "#1790FF",
    },
    done: {
        value: "done",
        label: "已上线",
        color: "#00B300",
    },
    abandon: {
        value: "abandon",
        label: "已废弃",
        color: "#B3B3B3",
    },
};
exports.INTERFACE_SHOW_LIST = [
    "username",
    "status",
    "up_time",
    "method",
    "path",
    "mock",
    "applicationname",
    "query",
    "data",
];
exports.INTERFACE_LIST_MAP = {
    username: "创建人",
    status: "状态",
    up_time: "更新时间",
    method: "Method",
    path: "接口路径",
    mock: "Mock地址",
    applicationname: "绑定的业务树",
    query: "请求参数",
    data: "返回数据",
};
exports.YAPI_TREE_INTERFACE_MAP = {
    0: "root",
    1: "project",
    2: "group",
    3: "list",
    4: "interface",
};
//# sourceMappingURL=constant.js.map