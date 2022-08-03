"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deactivate = exports.activate = void 0;
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
const vscode = require("vscode");
const yapiTree_1 = require("./views/yapiTree");
const login_1 = require("./command/login");
const itemCopy_1 = require("./command/itemCopy");
const search_1 = require("./command/search");
const init_1 = require("./command/init");
const exportInterface_1 = require("./command/exportInterface");
const viewInterface_1 = require("./command/viewInterface");
const yapi_data_1 = require("./command/yapi-data");
// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
function activate(context) {
    (0, init_1.default)();
    vscode.commands.executeCommand("setContext", "yapiTree.exportItemList", [
        "group",
        "list",
    ]);
    const yapiTree = new yapiTree_1.default();
    // Use the console to output diagnostic information (console.log) and errors (console.error)
    // This line of code will only be executed once when your extension is activated
    console.log('Congratulations, your extension "yapi2ts" is now active!');
    vscode.window.registerTreeDataProvider("yapiTree", yapiTree);
    // The command has been defined in the package.json file
    // Now provide the implementation of the command with registerCommand
    // The commandId parameter must match the command field in package.json
    const loginCmd = vscode.commands.registerCommand("yapi2ts.login", login_1.default);
    context.subscriptions.push(loginCmd);
    const resetProjectDataCdm = vscode.commands.registerCommand("yapiTree.resetProjectData", yapi_data_1.resetProjectData);
    context.subscriptions.push(resetProjectDataCdm);
    const refreshCdm = vscode.commands.registerCommand("yapiTree.refresh", () => yapiTree.refresh());
    context.subscriptions.push(refreshCdm);
    const itemCopyCdm = vscode.commands.registerCommand("yapiTree.itemCopy", itemCopy_1.default);
    context.subscriptions.push(itemCopyCdm);
    const exportInterfaceCmd = vscode.commands.registerCommand("yapiTree.exportInterface", exportInterface_1.default);
    context.subscriptions.push(exportInterfaceCmd);
    const viewInterfaceCmd = vscode.commands.registerCommand("yapiTree.viewInterface", viewInterface_1.default);
    context.subscriptions.push(viewInterfaceCmd);
    const searchCmd = vscode.commands.registerCommand("yapi2ts.search", () => (0, search_1.default)());
    context.subscriptions.push(searchCmd);
}
exports.activate = activate;
// this method is called when your extension is deactivated
function deactivate() { }
exports.deactivate = deactivate;
//# sourceMappingURL=extension.js.map