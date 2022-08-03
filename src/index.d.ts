interface Uppercamelcase {
  (avg: string): string;
}

declare module "uppercamelcase" {
  const uppercamelcase: Uppercamelcase;
  export default uppercamelcase;
}

interface ProjectItem {
  name: string;
  desc: string;
  group_id: number;
  add_time: number;
  up_time: number;
  _id: number;
  color: string;
  select_businessname: string;
}

interface ProjectRes {
  list: ProjectItem[];
}

interface MenuNewItem {
  _id: number;
  project_id: number;
  name: string;
  desc: string;
  add_time: number;
  up_time: number;
  list: YapiInterfaceRes[];
}

interface ListCatItem {
  add_time: number;
  title: string;
  method: string;
  path: string;
  protocol: string;
  _id: number;
}

interface ListCatListRes {
  count: number;
  total: number;
  list: ListCatItem[];
}

interface reqQueryItem {
  desc: string;
  example: string;
  name: string;
  required: string;
  query_type: string;
  _id: string;
}

interface reqHeaderItem {
  name: string;
  required: string;
  value: string;
  _id: string;
}

interface YapiInterfaceRes {
  add_time: number;
  applicationname: string;
  catid: number;
  desc: string;
  markdown: string;
  method: string;
  nocover: 1;
  path: string;
  project_id: number;
  protocol: string;
  req_body_form: any;
  req_body_other: string;
  req_headers: reqHeaderItem[];
  req_query: reqQueryItem[];
  res_body: string;
  title: string;
  status: string;
  up_time: number;
  username: string;
  _id: number;
}

interface GroupItem {
  addTime: number;
  groupDesc: string;
  groupName: string;
  uid: number;
  upTime: number;
  _id: number;
}

interface interfaceItem {
  addTime: number;
  projectId: number;
  title: string;
  uid: number;
  upTime: number;
  _id: number;
}

interface ProjectItem {
  addTime: number;
  basepath: string;
  groupId: number;
  name: string;
  pre_basepath: string;
  test_basepath: string;
  uid: number;
  upTime: number;
  _id: number;
}

interface SearchRes {
  group: GroupItem[];
  interface: interfaceItem[];
  project: ProjectItem[];
}
