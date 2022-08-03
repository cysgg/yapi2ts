import * as vscode from "vscode";
import { YapiItem } from "../views/yapiTree";
import mkfileSync from "../utils/mkFile";
import path = require("path");
import Y2d from "./y2t";

const viewInterface = async function (node: YapiItem) {
  const { deep, yid } = node;

  // list
  if (deep === 3) {
    const { name, content } = await Y2d(yid);

    const uri = path.resolve(__dirname, `../interfaces-view/${name}.ts`);

    mkfileSync(uri, content, {
      flag: "w+",
    });

    vscode.workspace.openTextDocument(uri).then(
      (doc) => {
        vscode.window.showTextDocument(doc);
      },
      (err) => {
        vscode.window.showErrorMessage(err);
      }
    );
  }
};

export default viewInterface;
