# yapi2ts README
一个支持 yapi 在 vscode TreeDataProvider 侧预览，并支持接口类型导出ts文件到本地的插件

## Features

1、支持本地设置 username 和 password，不用重复登录，请在 setting 中配置 yapi2ts.login.username 和 yapi2ts.login.password
2、支持不同内网搭建的 yapi 网站，设置域名即可适配，请在 setting 中配置 yapi2ts.yapi.origin 来配置对应域名
3、支持对应项目下小组、分组、接口展示，需要配置对应项目 id,请在 setting 中配置 yapi2ts.project.id 来展示项目yapi 数据
4、支持对应接口下的详细信息展示，接口请求体和返回体后续支持
5、支持接口详细信息内容复制，接口请求体和返回体复制内容后续考虑
6、支持接口请求类型声明和返回类型声明预览，点击后 vscode 自动打开预览文件，预览的文件在每次初始化插件时删除
7、支持接口请求类型声明和返回类型声明文件下载，文件名目前按照接口后二级路径字段生成，文件路径请在 setting 的 yapi2ts.export.exportRootDirName 进行配置

## simple

![yapi2ts_simple](https://github.com/cysgg/yapi2ts/blob/main/src/assets/img/yapi2ts.jpg)

## by the way

如果有问题欢迎邮件联系我 279709624@qq.com, github 不常登 --!

**Enjoy!**
