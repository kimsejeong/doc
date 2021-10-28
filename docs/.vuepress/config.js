module.exports = {
  // 注入到当前页面的 HTML <head> 中的标签
  // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  title: "ztq",
  // meta 中的描述文字，用于SEO,注入到当前页面的 HTML <head> 中的标签
  description: "ztq",
  head: [
    [
      "link",
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
      { rel: "icon", href: "/tiance.png" },
    ],
  ],
  //下面涉及到的md文件和其他文件的路径下一步再详细解释
  themeConfig: {
    logo: "/tiance.png", //网页顶端导航栏左上角的图标
    //顶部导航栏
    nav: [
      {
        text: "JavaScript",
        link: "/JavaScript/index.md",
      },
      { text: "Github", link: "https://github.com/chai618" },
    ],

    //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
    // sidebar: {
    //   "/pages/vue/": [
    //     {
    //       title: "原理", // 一级菜单名称
    //       collapsable: true, // false为默认展开菜单, 默认值true是折叠,
    //       sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
    //       children: [
    //         ["diff.md", "diff"], //菜单名称为'子菜单1'，跳转至/pages/folder1/test1.md
    //         ["react.md", "react"],
    //       ],
    //     },
    //   ],

    //   //...可添加多个不同的侧边栏，不同页面会根据路径显示不同的侧边栏
    // },
  },
  // base:'.'
  // "vuepress-plugin-auto-sidebar": {
  //   nav: true,
  // },
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      nav: true,
      collapsable: true,
    },
  },
};
