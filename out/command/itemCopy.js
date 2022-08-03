"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
async function default_1(node) {
    const { description } = node;
    try {
        await vscode.env.clipboard.writeText(description);
        vscode.window.showInformationMessage("复制成功");
    }
    catch (e) {
        vscode.window.showErrorMessage(e);
    }
}
exports.default = default_1;
//# sourceMappingURL=itemCopy.js.map