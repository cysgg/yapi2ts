import * as fs from "fs";
import * as vscode from "vscode";
import path = require("path");
import { getYapiProjectInfoData } from "./yapi-data";

function removeDir(dir: string) {
  let files = fs.readdirSync(dir);
  for (var i = 0; i < files.length; i++) {
    let newPath = path.join(dir, files[i]);
    let stat = fs.statSync(newPath);
    if (stat.isDirectory()) {
      //如果是文件夹就递归下去
      removeDir(newPath);
    } else {
      //删除文件
      fs.unlinkSync(newPath);
    }
  }
  fs.rmdirSync(dir); //如果文件夹是空的，就将自己删除掉
}

export const showStatusBar = async function (statusItem: vscode.StatusBarItem) {
  const vsConfig = vscode.workspace.getConfiguration("yapi2ts");
  const pId = vsConfig.get("project.id");
  const res: any = await getYapiProjectInfoData(pId as number);
  if (res) {
    const { group_name } = res;

    statusItem.text = `yapi2ts: ${group_name}`;
    statusItem.tooltip = `yapi projectId: ${pId}`;
    statusItem.show();
  }
};

const initExtends = function (statusItem: vscode.StatusBarItem) {
  const uri = path.resolve(__dirname, "../interfaces-view");

  if (fs.existsSync(uri)) {
    removeDir(uri);
  }

  showStatusBar(statusItem);
};

export default initExtends;
