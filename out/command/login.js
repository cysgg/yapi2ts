"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const index_1 = require("../config/index");
const axios_1 = require("axios");
const fs = require("fs");
const path = require("path");
const { yapi_login_url } = index_1.default;
const insetUsername = function () {
    const config = vscode.workspace.getConfiguration("yapi2ts");
    let username = config.get("login.username");
    if (username) {
        return Promise.resolve(username);
    }
    return vscode.window.showInputBox({
        password: false,
        placeHolder: "please inset username",
        prompt: "please inset yapi username",
    });
};
const insetPassword = function () {
    const config = vscode.workspace.getConfiguration("yapi2ts");
    let password = config.get("login.password");
    if (password) {
        return Promise.resolve(password);
    }
    return vscode.window.showInputBox({
        password: true,
        placeHolder: "please inset password",
        prompt: "please inset yapi password",
    });
};
function default_1() {
    insetUsername().then((username) => {
        insetPassword().then((password) => {
            axios_1.default
                .post(yapi_login_url, {
                email: username,
                password,
            })
                .then((res) => {
                const { data: { errcode, errmsg }, headers, } = res;
                if (errcode) {
                    vscode.window.showErrorMessage(errmsg);
                }
                else {
                    vscode.window.showInformationMessage(errmsg);
                    const cookies = headers["set-cookie"]?.map((cookie) => {
                        const [_yapi] = cookie.split(";");
                        return _yapi;
                    });
                    const cookieStr = cookies.join(";");
                    const uri = path.resolve(__dirname, "../utils/cookie.txt");
                    fs.writeFileSync(uri, cookieStr);
                    vscode.commands.executeCommand("yapiTree.refresh");
                }
            });
        });
    });
}
exports.default = default_1;
//# sourceMappingURL=login.js.map