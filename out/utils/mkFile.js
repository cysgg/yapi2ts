"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const fs = require("fs");
const pathModule = require("path");
const vscode = require("vscode");
function mkdirsSync(dirname) {
    if (fs.existsSync(dirname)) {
        return true;
    }
    else {
        if (mkdirsSync(pathModule.dirname(dirname))) {
            fs.mkdirSync(dirname);
            return true;
        }
    }
}
const mkfileSync = function (path, content, options) {
    if (mkdirsSync(pathModule.dirname(path))) {
        try {
            return fs.writeFileSync(path, content, options);
        }
        catch (e) {
            vscode.window.showErrorMessage(e);
        }
    }
};
exports.default = mkfileSync;
//# sourceMappingURL=mkFile.js.map