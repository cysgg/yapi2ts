"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const y2t_1 = require("./y2t");
const mkFile_1 = require("../utils/mkFile");
const yapi_data_1 = require("./yapi-data");
async function default_1(node) {
    const { label, deep, yid } = node;
    // group
    if (deep === 2) {
        const res = await (0, yapi_data_1.getYapiListCatListData)(yid);
        if (res && res.list) {
            const prolist = res.list.map(async (item) => {
                const { _id } = item;
                const { path, content } = await (0, y2t_1.default)(_id);
                (0, mkFile_1.default)(path, content, {
                    flag: "w+",
                });
            });
            await Promise.all(prolist);
            vscode.window.showInformationMessage(`${label} 分组接口已导出到本地(如需更改导出路径，请在设置中配置yapi2ts.export.exportRootDirName)`);
        }
    }
    // list
    if (deep === 3) {
        const { path, content } = await (0, y2t_1.default)(yid);
        (0, mkFile_1.default)(path, content, {
            flag: "wx+",
        });
        vscode.window.showInformationMessage(`${label} 接口已导出到本地(如需更改导出路径，请在设置中配置yapi2ts.export.exportRootDirName)`);
    }
}
exports.default = default_1;
//# sourceMappingURL=exportInterface.js.map