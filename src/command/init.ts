import * as fs from "fs";
import path = require("path");

function removeDir(dir: string) {
  let files = fs.readdirSync(dir);
  for (var i = 0; i < files.length; i++) {
    let newPath = path.join(dir, files[i]);
    let stat = fs.statSync(newPath);
    if (stat.isDirectory()) {
      //如果是文件夹就递归下去
      removeDir(newPath);
    } else {
      //删除文件
      fs.unlinkSync(newPath);
    }
  }
  fs.rmdirSync(dir); //如果文件夹是空的，就将自己删除掉
}

const initExtends = function () {
  const uri = path.resolve(__dirname, "../interfaces-view");

  if (fs.existsSync(uri)) {
    removeDir(uri);
  }
};

export default initExtends;
