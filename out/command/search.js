"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_1 = require("../config");
const vscode = require("vscode");
const yapi_data_1 = require("./yapi-data");
// class YapiQuickPick implements vscode.QuickPick<YapiQuickPickItem> {
// }
class YapiQuickPickItem {
    constructor(label, detail, description, buttons) {
        this.label = label;
        this.detail = detail;
        this.description = description;
        this.buttons = buttons;
    }
}
const getYapiGroupData = async function () {
    const res = await (0, yapi_data_1.getYapiProjectData)(config_1.default.projectId);
    if (res && res.list) {
        return res.list.map((item) => {
            const { name, desc, _id } = item;
            return {
                id: _id,
                label: name,
                description: desc,
            };
        });
    }
    return [];
};
const getGroupButtons = function () {
    const downTypeAction = {
        iconPath: {
            dark: vscode.Uri.file("../assets/icon/download-dark.png"),
            light: vscode.Uri.file("../assets/icon/download-light.png"),
        },
        tooltip: "导出分组接口到本地",
    };
    return [downTypeAction];
};
const getMenuNewList = async function (id) {
    const menuList = await (0, yapi_data_1.getYapiMenuNewData)(id);
    if (menuList && menuList.length) {
        return menuList.reduce((sList, item) => {
            const { name, desc, _id, project_id, list } = item;
            return sList.concat({
                project_id,
                catid: _id,
                label: name,
                description: "分组",
                detail: desc,
                buttons: getGroupButtons(),
            }, list.map((inte) => {
                const { _id, title, catid, project_id } = inte;
                return {
                    interfaceId: _id,
                    catid,
                    project_id,
                    label: `${name}---${title}`,
                    description: "接口",
                };
            }));
        }, []);
    }
    return [];
};
const searchYapiInProject = function () {
    vscode.window.showWarningMessage("暂不支持，敬请期待");
    return;
    vscode.window
        .showQuickPick(getYapiGroupData(), {
        title: "项目列表",
        placeHolder: "请确定项目进行搜索",
    })
        .then((res) => {
        if (res) {
            const { id } = res;
            vscode.window.showQuickPick(getMenuNewList(id)).then((res) => {
                const { project_id, catid, interfaceId } = res;
                config_1.default.treeProjectId = project_id;
                config_1.default.treeCatId = catid;
                config_1.default.treeInterfaceId = interfaceId;
            });
        }
    });
};
exports.default = searchYapiInProject;
//# sourceMappingURL=search.js.map