# Change Log

All notable changes to the "yapi2ts" extension will be documented in this file.

Check [Keep a Changelog](http://keepachangelog.com/) for recommendations on how to structure this file.


## [0.0.4]

fix
1、 修复接口详情id重复bug，导致只能展开一个接口详情的问题
## [0.0.3]

feat
1、 新增statusBar，可以预览当前 setting 中配置 yapi2ts.project.id 的项目名称

fix
1、 修改默认打开理财的 gourpId 问题
## [0.0.2]

fix
1、 修复图标消失问题
2、 修改携带已存在的cookie问题

## [0.0.1]

feat
1、支持本地设置 username 和 password，不用重复登录，请在 setting 中配置 yapi2ts.login.username 和 yapi2ts.login.password
2、支持不同内网搭建的 yapi 网站，设置域名即可适配，请在 setting 中配置 yapi2ts.yapi.origin 来配置对应域名
3、支持对应项目下小组、分组、接口展示，需要配置对应项目 id,请在 setting 中配置 yapi2ts.project.id 来展示项目yapi 数据
4、支持对应接口下的详细信息展示，接口请求体和返回体后续支持
5、支持接口详细信息内容复制，接口请求体和返回体复制内容后续考虑
6、支持接口请求类型声明和返回类型声明预览，点击后 vscode 自动打开预览文件，预览的文件在每次初始化插件时删除
7、支持接口请求类型声明和返回类型声明文件下载，文件名目前按照接口后二级路径字段生成，文件路径请在 setting 的 yapi2ts.export.exportRootDirName 进行配置
