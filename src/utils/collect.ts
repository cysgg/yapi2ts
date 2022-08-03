import config from "../config/index";

const {
  children_str,
  array_items_str,
  required_str,
  description_str,
  type_str,
} = config;

const resovleTypeArrayData = function (
  name: string,
  data: any,
  typeStrList: any
) {
  const itemData = data[array_items_str];
  const description = data[description_str];

  const arrDictionary = {
    name,
    type: "array",
    description,
    children: null,
  };

  const list: any = [];
  resolveTypeFunc(array_items_str, itemData, list);

  arrDictionary.children = list;
  typeStrList.push(arrDictionary);
};

const resovleTypeObjectData = function (
  objName: string,
  data: any,
  typeStrList: any
) {
  const childrenData = data[children_str];
  const description = data[description_str];
  const requiredList = data[required_str];

  const objDictionary = {
    name: objName,
    type: "object",
    description,
    requiredList,
    children: null,
  };
  const list: any = [];
  const keys = Object.keys(childrenData);

  keys.forEach((name) => {
    resolveTypeFunc(name, childrenData[name], list);
  });

  objDictionary.children = list;
  typeStrList.push(objDictionary);
};

const resovleTypeBasicData = function (
  name: string,
  data: any,
  typeStrList: any
) {
  const type = data[type_str];
  const description = data[description_str];

  const basicDictionary = {
    name,
    type,
    description,
  };
  typeStrList.push(basicDictionary);
};

const resolveTypeFunc = function (name: string, data: any, typeStrList: any) {
  const type = data[type_str];

  switch (type) {
    case "array":
      resovleTypeArrayData(name, data, typeStrList);
      break;

    case "object":
      resovleTypeObjectData(name, data, typeStrList);
      break;

    default:
      resovleTypeBasicData(name, data, typeStrList);
      break;
  }
};

export default function (name: string, define: any) {
  if (!define) {
    console.log("no value");
  }

  const typeStrList: any = [];
  resolveTypeFunc(name, define, typeStrList);
  return typeStrList;
}
