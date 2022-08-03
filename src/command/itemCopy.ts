import * as vscode from "vscode";
import { YapiItem } from "@/views/yapiTree";

export default async function (node: YapiItem) {
  const { description } = node;
  try {
    await vscode.env.clipboard.writeText(description as string);
    vscode.window.showInformationMessage("复制成功");
  } catch (e: any) {
    vscode.window.showErrorMessage(e);
  }
}
