# Cloud Music

<p align="center">
    <img src="https://i.imgur.com/kS9CsLP.png" alt="cloudmusic" />
</p>
<p align="center">
    <a href="https://cn.vuejs.org/v2/guide/"><img src="https://img.shields.io/badge/vue-v2.6.11-blue.svg?color=4FC08D&logo=vuedotjs" alt="vue" /></a>
    <a href="https://cli.vuejs.org/"><img src="https://img.shields.io/badge/vue--cli-v4.5.0-blue.svg?color=3EAF7C" alt="vue-cli" /></a>
    <a href="https://v3.router.vuejs.org/"><img src="https://img.shields.io/badge/vue--router-v3.2.0-blue.svg?color=3EAF7C" alt="vue-router" /></a>
    <a href="https://v3.vuex.vuejs.org/"><img src="https://img.shields.io/badge/vuex-v3.5.1-yellow.svg?color=3EAF7C" alt="vuex" /></a>
    <a href="https://element.eleme.cn/"><img src="https://img.shields.io/badge/element--ui-v2.15.7-blue.svg?color=409EFF" alt="element-ui" /></a>
    <a href="http://en.sass.hk/"><img src="https://img.shields.io/badge/sass-v1.26.5-blue.svg?color=CC6699&logo=sass" alt="sass" /></a>
    <img src="https://img.shields.io/badge/version-v1.0.0-yellow.svg" alt="version" />
    <img src="https://img.shields.io/badge/license-AGPL--3.0-green.svg" alt="license" />
</p>

> **Cloud Music 🎵 网易云音乐**
>
> 基于 Vue2、Vue-cli、Element-UI 的仿网易云音乐 | Cloud Music based on Vue 2 + Vue-cli + Element-UI
>
> 同时使用了：Vue Router, Vuex, Sass...

## 简介

一个平平无奇的低仿网易云，有待补完。

> **所用 CDN：** [BootCDN](https://www.bootcdn.cn/)

> **项目预览（部署在 Vercel 上，速度较慢）：** [cloudmusic](https://cloudmusic-mkild.vercel.app)

> **接口指路：** [NeteaseCloudMusicApi](https://github.com/Binaryify/NeteaseCloudMusicApi)

## 快速启动

```shell
# 克隆项目
# cnpmjs
git clone https://github.com.cnpmjs.org/Mkild/cloudmusic.git
# or
git clone https://github.com/Mkild/cloudmusic.git
# 进入项目目录
cd cloudmusic
# 安装依赖 （推荐yarn）
npm install  / yarn
# 启动服务
npm run serve  / yarn serve
# 打包
npm run build  / yarn build

```

## 使用到的插件/工具库

- **npm** [npm](https://docs.npmjs.com/about-npm) Node.js 自带的依赖管理工具
- **eslint-plugin-vue** [eslint-plugin-vue](https://eslint.vuejs.org/user-guide/#faq) 为在.vue 文件和包含 vue 代码的 js 文件中使用 ESlint 提供支持
- **axios** [axios](https://github.com/axios/axios) 基于 Promise 的 HTTP 请求库
- **qs** [qs](https://github.com/ljharb/qs) 查询参数序列化和解析库
- **babel-plugin-component** [babel-plugin-component](https://github.com/ElementUI/babel-plugin-component) element-ui 按需引入需要的插件
- **@babel/preset-env** [@babel/preset-env](https://www.babeljs.cn/docs/babel-preset-env) babel 的预设插件，处理 js 浏览器兼容
- **postcss-preset-env** 处理 css 浏览器兼容
- **postcss-pxtorem** 将 px 换算成 rem，实现自适应
- **vue-meta** [vue-meta](https://vue-meta.nuxtjs.org) 用于 Vue 的 metadata 管理器
- **vue-lazyload** [vue-lazyload](https://www.npmjs.com/package/vue-lazyload) 用于 Vue 的图片懒加载
- **good-storage** [good-storage](https://www.npmjs.com/package/good-storage) 对原生 web storage 的封装，简单好用
- **lodash-es** [lodash-es](https://www.lodashjs.com) js 模块化工具库 lodash 的 es modules 版本，体积更小
- **better-scroll** [better-scroll](http://ustbhuangyi.github.io/better-scroll) 用于歌词滚动，这部分代码用的别人的
- **xgplayer** [xgplayer](https://v2.h5player.bytedance.com) 西瓜视频播放器，支持按需引入
- **workbox-webpack-plugin** [workbox-webpack-plugin](https://www.lodashjs.com) 谷歌的利用 Service Worker 实现页面预缓存的插件

## 工程化

- Git Hook 工具：[husky](https://typicode.github.io/husky/#/) + [lint-staged](https://github.com/okonet/lint-staged)
- 代码规范： [Prettier](https://prettier.io/) + [ESLint](https://eslint.org/)
- 提交规范：[Commitizen](http://commitizen.github.io/cz-cli/) + [Commitlint](https://commitlint.js.org/#/)

## **浏览器支持**

|       IE        | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/edge/edge_48x48.png" alt=" Edge" height="24px" />](http://godban.github.io/browsers-support-badges/)Edge | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/firefox/firefox_48x48.png" alt="Firefox" height="24px" />](http://godban.github.io/browsers-support-badges/)Firefox | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/chrome/chrome_48x48.png" alt="Chrome" height="24px" />](http://godban.github.io/browsers-support-badges/)Chrome | [<img src="https://raw.githubusercontent.com/alrra/browser-logos/master/src/safari/safari_48x48.png" alt="Safari" height="24px" />](http://godban.github.io/browsers-support-badges/)Safari |
| :-------------: | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: | :-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------: |
| last 2 versions |                                                                                   last 2 versions                                                                                    |                                                                                         last 2 versions                                                                                         |                                                                                       last 2 versions                                                                                       |                                                                                       last 2 versions                                                                                       |

## 快照

![image.png](https://i.imgur.com/NrtGn9C.png)

![image.png](https://i.imgur.com/wHgS4Vd.png)

![image.png](https://i.imgur.com/ZI0JNNc.png)

![image.png](https://i.imgur.com/y7qvht4.png)

![image.png](https://i.imgur.com/cRpOP46.png)

![image.png](https://i.imgur.com/DIHMoJ0.png)
