# ZCY-UI
ZCY UI components build with jquery and handlebars

## 目录结构
<pre>
    ZCY-UI/
    |-- build               存放webpack的配置
    |-- dist                存放最终打包文件
    |-- src                 存放demo的vue结构代码
        |-- assets          存放demo的静态资源
        |-- components      存放demo的vue组件
        |-- style           存放demo的样式
        |-- views           存放demo的界面
        `routes.js          vue的路由配置
    |-- static              存放静态资源
    |-- test                存放测试代码
    |-- zcy                 存放ui库代码
        |-- components      存放组件及demo
        |-- docs            存放组件介绍文档
        |-- locale          存放国际化描述
        |-- style           存放组件的样式
        |-- utils           存放组件的依赖工具
        `index.js           主入口
</pre>

## 项目开发

### 安装运行

  运行之前，在当前目录`npm i`

  本地运行 `npm run dev`

  打包 `npm run build`

### 开发组件

1. 在zcy/components目录条件新组件，描述的md文件与目录名相同

    *ps: 与目录名相同是为了能唯一区分每个组件，用于本地demo运行的cache*

2. 修改src/views/components.vue，添加菜单栏
3. 修改src/routers.js，添加路由配置