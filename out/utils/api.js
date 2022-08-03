"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getData = void 0;
const vscode = require("vscode");
const axios_1 = require("axios");
const fs = require("fs");
const path = require("path");
const getData = function (url, params) {
    const uri = path.resolve(__dirname, "../utils/cookie.txt");
    const cookies = fs.readFileSync(uri).toString();
    return new Promise((s, j) => {
        axios_1.default
            .get(url, {
            params,
            headers: {
                Cookie: cookies,
            },
        })
            .then((res) => {
            const { data: { errcode, errmsg, data }, } = res;
            if (errcode) {
                vscode.window.showErrorMessage(errmsg);
                return j(errmsg);
            }
            else {
                return s(data);
            }
        })
            .catch((e) => {
            return j(e);
        });
    });
};
exports.getData = getData;
//# sourceMappingURL=api.js.map