"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.resetProjectData = exports.refreshProjectData = exports.getYapiProjectData = exports.getYapiMenuNewData = exports.getYapiProjectInfoData = exports.getYapiGroupData = exports.getYapiListCatListData = void 0;
const api_1 = require("../utils/api");
const vscode = require("vscode");
const index_1 = require("../config/index");
const { 
// 详细接口
yapi_id_url, 
// 分组列表
yapi_list_cat_url, 
// 项目列表
yapi_project_list_url, 
// 项目详情
yapi_group_url, 
// 小组详情
yapi_project_info_url, 
// 分组列表
yapi_menu_new_url, } = index_1.default;
// 获取分组列表
const getYapiListCatListData = function (id) {
    return (0, api_1.getData)(yapi_list_cat_url, {
        page: 1,
        limit: 1000,
        catid: id,
    });
};
exports.getYapiListCatListData = getYapiListCatListData;
// 项目详情
const getYapiGroupData = function (id) {
    return (0, api_1.getData)(yapi_group_url, { id });
};
exports.getYapiGroupData = getYapiGroupData;
// 小组详情
const getYapiProjectInfoData = function (id) {
    return (0, api_1.getData)(yapi_project_info_url, { id });
};
exports.getYapiProjectInfoData = getYapiProjectInfoData;
// 分组列表
const getYapiMenuNewData = function (id) {
    return (0, api_1.getData)(yapi_menu_new_url, { project_id: id });
};
exports.getYapiMenuNewData = getYapiMenuNewData;
// 获取项目列表
const getYapiProjectData = function (id = 2925) {
    return (0, api_1.getData)(yapi_project_list_url, {
        group_id: id,
        page: 1,
        limit: 1000,
    });
};
exports.getYapiProjectData = getYapiProjectData;
const refreshProjectData = function () {
    return (0, exports.getYapiProjectData)(index_1.default.projectId);
};
exports.refreshProjectData = refreshProjectData;
const resetProjectData = function () {
    vscode.window
        .showInputBox({
        password: false,
        placeHolder: "please inset projectId",
        prompt: "please inset yapi projectId",
    })
        .then((id) => {
        if (id) {
            index_1.default.projectId = parseInt(id);
            (0, exports.refreshProjectData)();
        }
    });
};
exports.resetProjectData = resetProjectData;
//# sourceMappingURL=yapi-group.js.map