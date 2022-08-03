import * as vscode from "vscode";
import config from "../config/index";
import axios from "axios";
import * as fs from "fs";
import path = require("path");

const { yapi_login_url } = config;

const insetUsername = function ():
  | Thenable<string | undefined>
  | Promise<string | unknown> {
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

const insetPassword = function ():
  | Thenable<string | undefined>
  | Promise<string | unknown> {
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

export default function () {
  (insetUsername() as any).then((username: string) => {
    (insetPassword() as any).then((password: string) => {
      axios
        .post(yapi_login_url, {
          email: username,
          password,
        })
        .then((res) => {
          const {
            data: { errcode, errmsg },
            headers,
          } = res;

          if (errcode) {
            vscode.window.showErrorMessage(errmsg);
          } else {
            vscode.window.showInformationMessage(errmsg);
            const cookies = headers["set-cookie"]?.map((cookie) => {
              const [_yapi] = cookie.split(";");
              return _yapi;
            });
            const cookieStr = cookies!.join(";");
            const uri = path.resolve(__dirname, "../utils/cookie.txt");
            fs.writeFileSync(uri, cookieStr);
            vscode.commands.executeCommand("yapiTree.refresh");
          }
        });
    });
  });
}
