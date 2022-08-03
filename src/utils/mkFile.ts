import * as fs from "fs";
import * as pathModule from "path";
import * as vscode from "vscode";

function mkdirsSync(dirname: string) {
  if (fs.existsSync(dirname)) {
    return true;
  } else {
    if (mkdirsSync(pathModule.dirname(dirname))) {
      fs.mkdirSync(dirname);
      return true;
    }
  }
}

const mkfileSync = function (path: string, content: any, options: any) {
  if (mkdirsSync(pathModule.dirname(path))) {
    try {
      return fs.writeFileSync(path, content, options);
    } catch (e) {
      vscode.window.showErrorMessage(e as string);
    }
  }
};

export default mkfileSync;
