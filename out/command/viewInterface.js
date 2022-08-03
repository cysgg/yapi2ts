"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const mkFile_1 = require("../utils/mkFile");
const path = require("path");
const y2t_1 = require("./y2t");
const viewInterface = async function (node) {
    const { deep, yid } = node;
    // list
    if (deep === 3) {
        const { name, content } = await (0, y2t_1.default)(yid);
        const uri = path.resolve(__dirname, `../interfaces-view/${name}.ts`);
        (0, mkFile_1.default)(uri, content, {
            flag: "w+",
        });
        vscode.workspace.openTextDocument(uri).then((doc) => {
            vscode.window.showTextDocument(doc);
        }, (err) => {
            vscode.window.showErrorMessage(err);
        });
    }
};
exports.default = viewInterface;
//# sourceMappingURL=viewInterface.js.map