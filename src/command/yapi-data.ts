import { getData } from "../utils/api";
import * as vscode from "vscode";
import config from "../config/index";

const {
  // 详细接口
  yapi_id_url,
  // 分组列表
  yapi_list_cat_url,
  // 项目列表
  yapi_project_list_url,
  // 项目详情
  yapi_group_url,
  // 小组详情
  yapi_project_info_url,
  // 分组列表
  yapi_menu_new_url,
  // 搜索接口
  yapi_search_url,
} = config;

// 获取分组列表
export const getYapiListCatListData = function (
  id: number
): Promise<ListCatListRes> {
  return getData(yapi_list_cat_url, {
    page: 1,
    limit: 1000,
    catid: id,
  });
};

// 项目详情
export const getYapiGroupData = function (id: number): Promise<ProjectRes> {
  return getData(yapi_group_url, { id });
};

// 小组详情
export const getYapiProjectInfoData = function (
  id: number
): Promise<ProjectRes> {
  return getData(yapi_project_info_url, { id });
};

// 分组列表
export const getYapiMenuNewData = function (
  id: number
): Promise<MenuNewItem[]> {
  return getData(yapi_menu_new_url, { project_id: id });
};

// 获取项目列表
export const getYapiProjectData = function (
  id: number = 2925
): Promise<ProjectRes> {
  return getData(yapi_project_list_url, {
    group_id: id,
    page: 1,
    limit: 1000,
  });
};

// 获取接口详情
export const getYapiInterfaceData = function (
  id: number
): Promise<YapiInterfaceRes> {
  return getData(yapi_id_url, {
    id,
  });
};

export const refreshProjectData = function () {
  return getYapiProjectData(config.projectId);
};

export const resetProjectData = function () {
  vscode.window
    .showInputBox({
      password: false,
      placeHolder: "please inset projectId",
      prompt: "please inset yapi projectId",
    })
    .then((id) => {
      if (id) {
        config.projectId = parseInt(id!);
        refreshProjectData();
      }
    });
};

export const getSearchData = function (q: string): Promise<SearchRes> {
  return getData(yapi_search_url, { q });
};
