import * as vscode from "vscode";
import axios from "axios";
import * as fs from "fs";
import * as path from "path";

export const getData = function (url: string, params: any): any {
  const uri = path.resolve(__dirname, "../utils/cookie.txt");
  const cookies = fs.readFileSync(uri).toString();

  return new Promise((s, j) => {
    axios
      .get(url, {
        params,
        headers: {
          Cookie: cookies,
        },
      })
      .then((res) => {
        const {
          data: { errcode, errmsg, data },
        } = res;

        if (errcode) {
          vscode.window.showErrorMessage(errmsg);
          return j(errmsg);
        } else {
          return s(data);
        }
      })
      .catch((e) => {
        return j(e);
      });
  });
};
