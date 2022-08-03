"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.YapiItem = void 0;
const yapi_data_1 = require("../command/yapi-data");
const vscode = require("vscode");
const index_1 = require("../config/index");
const constant_1 = require("../utils/constant");
const moment = require("moment");
const collect_1 = require("../utils/collect");
const { note_time_format } = index_1.default;
class YapiTree {
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    refresh() {
        return this._onDidChangeTreeData.fire();
    }
    getChildren(element) {
        if (element) {
            const { deep } = element;
            switch (deep) {
                case 1:
                    return this._getMenuNewData(element);
                case 2:
                    return this._getYapiListCatListData(element);
                case 3:
                    return this._getYapiInterfaceData(element);
                case 4:
                    return this._getInterfaceChildren(element);
                case 5:
                    return this._getInterfaceProps(element);
            }
        }
        return this._getProjectData();
    }
    getTreeItem(element) {
        return element;
    }
    async _getProjectData() {
        const res = await (0, yapi_data_1.getYapiProjectData)(index_1.default.projectId);
        const expandProjectId = index_1.default.treeProjectId;
        if (res && res.list) {
            return res.list.map((item) => {
                const { name, select_businessname, add_time, up_time, desc, _id } = item;
                const createTime = moment.unix(add_time).format(note_time_format);
                const updateTime = moment.unix(up_time).format(note_time_format);
                const toolStr = `<div>创建时间： ${createTime} </div>
<div>更新时间： ${updateTime} </div>
<div>容器名： ${select_businessname} </div>
<div>描述： ${desc || ""} </div>
`;
                const tooltip = new vscode.MarkdownString(toolStr);
                tooltip.supportHtml = true;
                const collapsed = _id === expandProjectId
                    ? vscode.TreeItemCollapsibleState.Expanded
                    : vscode.TreeItemCollapsibleState.Collapsed;
                return new YapiItem(name, collapsed, 1, _id, tooltip);
            });
        }
        return [];
    }
    async _getMenuNewData(element) {
        const { yid } = element;
        const res = await (0, yapi_data_1.getYapiMenuNewData)(yid);
        const expandMenuId = index_1.default.treeProjectId;
        if (res && res.length) {
            return res.map((item) => {
                const { name, desc, up_time, add_time, _id } = item;
                const createTime = moment.unix(add_time).format(note_time_format);
                const updateTime = moment.unix(up_time).format(note_time_format);
                const toolStr = `<div>创建时间： ${createTime} </div>
<div>更新时间： ${updateTime} </div>
<div>描述： ${desc || ""} </div>
`;
                const tooltip = new vscode.MarkdownString(toolStr);
                tooltip.supportHtml = true;
                const collapsed = _id === expandMenuId
                    ? vscode.TreeItemCollapsibleState.Expanded
                    : vscode.TreeItemCollapsibleState.Collapsed;
                return new YapiItem(name, collapsed, 2, _id, tooltip);
            });
        }
        return [];
    }
    async _getYapiListCatListData(element) {
        const { yid } = element;
        const res = await (0, yapi_data_1.getYapiListCatListData)(yid);
        const expandInterfaceId = index_1.default.treeInterfaceId;
        if (res && res.list) {
            return res.list.map((item) => {
                const { title, add_time, protocol, path, method, _id } = item;
                const timeStr = moment.unix(add_time).format(note_time_format);
                const toolStr = `<div>创建时间： ${timeStr} </div>
<div>协议： ${protocol} </div>
<div>路径： ${path} </div>
<div>method: ${method} </div>
`;
                const desc = new vscode.MarkdownString(toolStr);
                desc.supportHtml = true;
                const collapsed = _id === expandInterfaceId
                    ? vscode.TreeItemCollapsibleState.Expanded
                    : vscode.TreeItemCollapsibleState.Collapsed;
                return new YapiItem(title, collapsed, 3, _id, desc);
            });
        }
        return [];
    }
    async _getYapiInterfaceData(element) {
        const { yid } = element;
        const data = await (0, yapi_data_1.getYapiInterfaceData)(yid);
        const vsConfig = vscode.workspace.getConfiguration("yapi2ts");
        const origin = vsConfig.get("yapi.origin");
        if (data) {
            const { applicationname, path } = data;
            const firstPath = applicationname.split("-").slice(2, 4).join("_");
            return constant_1.INTERFACE_SHOW_LIST.map((key, index) => {
                const label = constant_1.INTERFACE_LIST_MAP[key];
                const target = data[key];
                let val = "";
                let collapsState = vscode.TreeItemCollapsibleState.None;
                switch (key) {
                    case "status":
                        const statusItem = constant_1.INTERFACE_STATUS_OBJ[target];
                        val = statusItem.label;
                        break;
                    case "up_time":
                        val = moment.unix(target).format(note_time_format);
                        break;
                    case "path":
                        val = `${path}`;
                        break;
                    case "mock":
                        val = `${origin}/${firstPath}${path}`;
                        break;
                    case "query":
                        return this._getInterfaceQueryData(data);
                    case "data":
                        return this._getInterfaceBodyData(data);
                    default:
                        val = target;
                        break;
                }
                const toolTip = `${label}:${val}`;
                return new YapiItem(label, collapsState, 4, index, toolTip, val);
            });
        }
        return [];
    }
    _getInterfaceQueryData(data) {
        const { method } = data;
        const children = [
            {
                name: "headers",
                data,
            },
            {
                name: method === "GET" ? "params" : "body",
                data,
            },
        ];
        return new YapiItem("请求参数", vscode.TreeItemCollapsibleState.None, 4, 7, "请求参数", "", children);
    }
    _getInterfaceBodyData(data) {
        const { res_body } = data;
        const parseResBody = JSON.parse(res_body || "{}");
        console.log(parseResBody);
        // 后续支持
        return new YapiItem("返回数据", vscode.TreeItemCollapsibleState.None, 4, 8, "返回数据", "");
    }
    _getInterfaceChildren(element) {
        const { label, children } = element;
        if (label === "请求参数") {
            return children.map((child, index) => {
                const { name, data } = child;
                const { req_headers, req_query, method, req_body_other } = data;
                let reqQueryChildrens;
                if (name === "headers") {
                    reqQueryChildrens = req_headers;
                }
                else if (name === "params") {
                    reqQueryChildrens = req_query;
                }
                else if (name === "body") {
                    const bodyDir = JSON.parse(req_body_other || "{}");
                    const [{ children: collChildren, requiredList = [] }] = (0, collect_1.default)("Props", bodyDir);
                    reqQueryChildrens = collChildren.map((child) => {
                        const { name, type, description } = child;
                        return {
                            children: child,
                            name,
                            type,
                            description,
                            isRequired: requiredList.includes(name),
                        };
                    });
                }
                return new YapiItem(name, vscode.TreeItemCollapsibleState.Expanded, 5, index, name, "", reqQueryChildrens);
            });
        }
        if (label === "返回数据") {
            return new YapiItem("test", vscode.TreeItemCollapsibleState.None, 5, 1, "test", "test");
        }
    }
    _getInterfaceProps(element) {
        const { label, children } = element;
        if (label === "headers") {
            return children.map((child, index) => {
                const { name, value, required } = child;
                const toolStr = `<div>key： ${name} </div>
<div>value： ${value} </div>
<div>必须： ${required === "1" ? "是" : "否"} </div>
`;
                const tooltip = new vscode.MarkdownString(toolStr);
                tooltip.supportHtml = true;
                return new YapiItem(name, vscode.TreeItemCollapsibleState.None, 6, index, tooltip, value);
            });
        }
        else if (label === "body") {
            return children.map((child, index) => {
                const { children, name, type, description = "", isRequired } = child;
                const toolStr = `<div>名称： ${name} </div>
<div>类型： ${type} </div>
<div>描述： ${description}</div>
<div>必须： ${isRequired ? "是" : "否"} </div>
`;
                const tooltip = new vscode.MarkdownString(toolStr);
                tooltip.supportHtml = true;
                return new YapiItem(name, vscode.TreeItemCollapsibleState.None, 6, index, tooltip, description, children);
            });
        }
        else if (label === "params") {
            return children.map((child, index) => {
                const { desc, example, name, query_type, required } = child;
                const toolStr = `<div>名称： ${name} </div>
<div>描述： ${desc} </div>
<div>类型： ${query_type} </div>
<div>示例： ${example}</div>
<div>必须： ${required === "1" ? "是" : "否"} </div>
`;
                const tooltip = new vscode.MarkdownString(toolStr);
                tooltip.supportHtml = true;
                return new YapiItem(name, vscode.TreeItemCollapsibleState.None, 6, index, tooltip, desc);
            });
        }
    }
}
exports.default = YapiTree;
class YapiItem extends vscode.TreeItem {
    constructor(label, collapsibleState, deep = 0, yid, tooltip, desc, children) {
        super(label, collapsibleState);
        this.label = label;
        this.collapsibleState = collapsibleState;
        this.deep = deep;
        this.yid = yid;
        this.tooltip = tooltip;
        this.desc = desc;
        this.children = children;
        this.id = yid.toString();
        this.description = desc || "";
        this.tooltip = tooltip;
        this.deep = deep;
        this.yid = yid;
        this.children = children;
        this.contextValue = constant_1.YAPI_TREE_INTERFACE_MAP[deep];
    }
}
exports.YapiItem = YapiItem;
//# sourceMappingURL=yapiTree.js.map