import * as vscode from "vscode";
import { YapiItem } from "@/views/yapiTree";
import Y2d from "./y2t";
import mkfileSync from "../utils/mkFile";
import { getYapiListCatListData } from "./yapi-data";

export default async function (node: YapiItem) {
  const { label, deep, yid } = node;
  // group
  if (deep === 2) {
    const res = await getYapiListCatListData(yid);

    if (res && res.list) {
      const prolist = res.list.map(async (item) => {
        const { _id } = item;
        const { path, content } = await Y2d(_id);

        mkfileSync(path, content, {
          flag: "w+",
        });
      });

      await Promise.all(prolist);
      vscode.window.showInformationMessage(
        `${label} 分组接口已导出到本地(如需更改导出路径，请在设置中配置yapi2ts.export.exportRootDirName)`
      );
    }
  }

  // list
  if (deep === 3) {
    const { path, content } = await Y2d(yid);

    mkfileSync(path, content, {
      flag: "wx+",
    });

    vscode.window.showInformationMessage(
      `${label} 接口已导出到本地(如需更改导出路径，请在设置中配置yapi2ts.export.exportRootDirName)`
    );
  }
}
