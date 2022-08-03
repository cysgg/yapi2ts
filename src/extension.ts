// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from "vscode";
import YapiTree from "./views/yapiTree";
import login from "./command/login";
import itemCopy from "./command/itemCopy";
import search from "./command/search";
import initExtends from "./command/init";
import exportInterface from "./command/exportInterface";
import viewInterface from "./command/viewInterface";
import { resetProjectData } from "./command/yapi-data";

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
  initExtends();
  
  vscode.commands.executeCommand("setContext", "yapiTree.exportItemList", [
    "group",
    "list",
  ]);

  const yapiTree = new YapiTree();
  // Use the console to output diagnostic information (console.log) and errors (console.error)
  // This line of code will only be executed once when your extension is activated
  console.log('Congratulations, your extension "yapi2ts" is now active!');

  vscode.window.registerTreeDataProvider("yapiTree", yapiTree);
  // The command has been defined in the package.json file
  // Now provide the implementation of the command with registerCommand
  // The commandId parameter must match the command field in package.json
  const loginCmd = vscode.commands.registerCommand("yapi2ts.login", login);
  context.subscriptions.push(loginCmd);

  const resetProjectDataCdm = vscode.commands.registerCommand(
    "yapiTree.resetProjectData",
    resetProjectData
  );
  context.subscriptions.push(resetProjectDataCdm);

  const refreshCdm = vscode.commands.registerCommand("yapiTree.refresh", () =>
    yapiTree.refresh()
  );
  context.subscriptions.push(refreshCdm);

  const itemCopyCdm = vscode.commands.registerCommand(
    "yapiTree.itemCopy",
    itemCopy
  );
  context.subscriptions.push(itemCopyCdm);

  const exportInterfaceCmd = vscode.commands.registerCommand(
    "yapiTree.exportInterface",
    exportInterface
  );
  context.subscriptions.push(exportInterfaceCmd);

  const viewInterfaceCmd = vscode.commands.registerCommand(
    "yapiTree.viewInterface",
    viewInterface
  );
  context.subscriptions.push(viewInterfaceCmd);

  const searchCmd = vscode.commands.registerCommand("yapi2ts.search", () =>
    search()
  );
  context.subscriptions.push(searchCmd);
}

// this method is called when your extension is deactivated
export function deactivate() {}
