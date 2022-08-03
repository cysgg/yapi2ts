import * as vscode from "vscode";

const vsConfig = vscode.workspace.getConfiguration("yapi2ts");
const projectId: number = vsConfig.get("project.id")!;
const origin = vsConfig.get("yapi.origin");

const defaultConfig = {
  treeProjectId: 3584,
  treeCatId: 0,
  treeInterfaceId: 0,
  type_str: "type",
  description_str: "description",
  children_str: "properties",
  array_items_str: "items",
  required_str: "required",
  note_time_format: "YYYY-MM-DD hh:mm:ss",
  yapi_id_url: `${origin}/yapi/api/interface/get`,
  yapi_group_url: `${origin}/yapi/api/interface/list_cat`,
  yapi_login_url: `${origin}/yapi/api/user/login`,
  yapi_list_cat_url: `${origin}/yapi/api/interface/list_cat`,
  yapi_menu_new_url: `${origin}/yapi/api/interface/list_menu_new`,
  yapi_project_info_url: `${origin}/yapi/api/project/get`,
  yapi_project_list_url: `${origin}/yapi/api/project/list`,
  yapi_search_url: `${origin}/yapi/api/project/search`,
  projectId: projectId,
};

export default defaultConfig;
