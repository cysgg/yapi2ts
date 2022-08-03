import config from "../config";
import * as vscode from "vscode";
import { getYapiMenuNewData, getYapiProjectData } from "./yapi-data";

// class YapiQuickPick implements vscode.QuickPick<YapiQuickPickItem> {

// }

class YapiQuickPickItem {
  label: string;
  detail?: string;
  description?: string;
  buttons?: vscode.QuickInputButton[];
  constructor(
    label: string,
    detail?: string,
    description?: string,
    buttons?: vscode.QuickInputButton[]
  ) {
    this.label = label;
    this.detail = detail;
    this.description = description;
    this.buttons = buttons;
  }
}

const getYapiGroupData = async function (): Promise<vscode.QuickPickItem[]> {
  const res: ProjectRes = await getYapiProjectData(config.projectId);

  if (res && res.list) {
    return res.list.map((item) => {
      const { name, desc, _id } = item;
      return {
        id: _id,
        label: name,
        description: desc,
      };
    });
  }
  return [];
};

const getGroupButtons = function () {
  const downTypeAction: vscode.QuickInputButton = {
    iconPath: {
      dark: vscode.Uri.file("../assets/icon/download-dark.png"),
      light: vscode.Uri.file("../assets/icon/download-light.png"),
    },
    tooltip: "导出分组接口到本地",
  };

  return [downTypeAction];
};

const getMenuNewList = async function (id: number) {
  const menuList = await getYapiMenuNewData(id);
  if (menuList && menuList.length) {
    return menuList.reduce((sList: any, item) => {
      const { name, desc, _id, project_id, list } = item;
      return sList.concat(
        {
          project_id,
          catid: _id,
          label: name,
          description: "分组",
          detail: desc,
          buttons: getGroupButtons(),
        },
        list.map((inte) => {
          const { _id, title, catid, project_id } = inte;
          return {
            interfaceId: _id,
            catid,
            project_id,
            label: `${name}---${title}`,
            description: "接口",
          };
        })
      );
    }, []);
  }
  return [];
};

const searchYapiInProject = function () {
  vscode.window.showWarningMessage("暂不支持，敬请期待");
  return;
  vscode.window
    .showQuickPick(getYapiGroupData(), {
      title: "项目列表",
      placeHolder: "请确定项目进行搜索",
    })
    .then((res: any) => {
      if (res) {
        const { id } = res;
        vscode.window.showQuickPick(getMenuNewList(id)).then((res: any) => {
          const { project_id, catid, interfaceId } = res;
          config.treeProjectId = project_id;
          config.treeCatId = catid;
          config.treeInterfaceId = interfaceId;
        });
      }
    });
};

export default searchYapiInProject;
