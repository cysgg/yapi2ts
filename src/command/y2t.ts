import config from "../config/index";
import resolveDefined from "../utils/collect";
import transform2type, { getTypeStr } from "../utils/transform";
const uppercamelcase = require("uppercamelcase");
import * as pathModule from "path";
import * as moment from "moment";
import * as vscode from "vscode";
import { getData } from "../utils/api";

const { yapi_id_url, note_time_format } = config;

const getRequestInterface = function (
  rootName: string,
  method: string,
  req_query: reqQueryItem[],
  req_body_other: string
) {
  if (method === "POST") {
    const parseReqBody = JSON.parse(req_body_other || "{}");
    const [typeTree] = resolveDefined(`${rootName}ReqData`, parseReqBody);
    const data = transform2type(typeTree);

    return data;
  }

  if (method === "GET") {
    if (!req_query || !req_query.length) {
      return `
// no request params
`;
    }
    const queryTypes = req_query.map((req) => {
      const { name, desc, required, query_type } = req;

      const midSuffix = required === "1" ? ":" : "?:";
      let tsTypes = [query_type];
      if (Array.isArray(query_type)) {
        tsTypes = query_type;
      }

      if (!query_type) {
        tsTypes = ["any"];
      }

      return getTypeStr("  ", desc, name, midSuffix, tsTypes.join(" | "));
    });
    return `
export interface ${rootName}ReqQuery {
  ${queryTypes.join("\n")}
}
`;
  }
};

const getResponseInterface = function (rootName: string, res_body: string) {
  const parseResBody = JSON.parse(res_body || "{}");
  const [typeTree] = resolveDefined(rootName, parseResBody);
  const resDataInterfaceStr = transform2type(typeTree);
  if (!resDataInterfaceStr) {
    return "// no response interface";
  }
  return resDataInterfaceStr;
};

const resolveYapiConfig = function (data: any, dirPath: string) {
  if (data) {
    const {
      res_body,
      title,
      username,
      desc,
      applicationname,
      path,
      add_time,
      up_time,
      method,
      req_query,
      req_body_other,
    } = data;

    const pathList = path.split("/");
    const upTime = moment.unix(up_time).format(note_time_format);
    const crTime = moment.unix(add_time).format(note_time_format);
    const yapiName = pathList.slice(pathList.length - 2).join("_");

    const rootName = uppercamelcase(yapiName);
    const descStr = desc
      ? `\`${desc}\`
`
      : "";

    const createHeaders = `
/*
 * @title: ${title}
 * @author: ${username}
 * @createDate: ${crTime}
 * @updateDate: ${upTime}
 * @container: ${applicationname}
 * @method: ${method}
 */

${descStr}
export const ${rootName}Url = "${path}";
`;

    const apiReqTypeContent = getRequestInterface(
      rootName,
      method,
      req_query,
      req_body_other
    );

    const apiResTypeContent = getResponseInterface(rootName, res_body);
    const apiFileContent = `${createHeaders}
/******************     requestInterface     ******************/
${apiReqTypeContent}
/******************     responseInterface     ******************/
${apiResTypeContent}
`;

    const filePath = pathModule.join(dirPath, `${rootName}.ts`);

    return {
      name: rootName,
      path: filePath,
      content: apiFileContent,
    };
  }
};

const exceYapiId2Types = function (yapiId = 259577) {
  const vsConfig = vscode.workspace.getConfiguration("yapi2ts");
  const rootPath = vsConfig.get("export.exportRootDirName");

  const folderpath = vscode.workspace.rootPath;
  let filePath = "";

  if (folderpath) {
    filePath = pathModule.join(folderpath, rootPath as string);
  } else {
    vscode.window.showErrorMessage("工作区为空");
    return;
  }

  return getData(yapi_id_url, { id: yapiId }).then((res: any) =>
    resolveYapiConfig(res, filePath)
  );
};

export default exceYapiId2Types;
