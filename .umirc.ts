import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {
    loading: '@/loading',
  },
  history: { type: 'hash' },
  publicPath: 'https://cdn.jsdelivr.net/gh/fierew/fierew.github.io@v1.0.5/',
  runtimePublicPath: true,
  antd: {
    dark: false,
    compact: false,
  },
  layout: {
    name: 'Blog Admin',
    locale: true,
  },
  locale: {
    default: 'zh-CN',
    antd: true,
    title: true,
    baseNavigator: false,
    baseSeparator: '-',
  },
  routes: [
    {
      path: '/',
      exact: true,
      component: 'index',
      redirect: '/dashboard',
    },
    {
      path: '/login',
      exact: true,
      component: 'login/index',
      title: '登录',
      layout: {
        hideMenu: true,
        hideNav: true,
      },
    },
    {
      path: '/register',
      exact: true,
      component: 'register/index',
      title: '注册',
      layout: {
        hideMenu: true,
        hideNav: true,
      },
    },
    {
      path: '/dashboard',
      exact: true,
      component: 'dashboard/index',
      name: '仪表盘',
      icon: 'dashboard',
      title: '仪表盘',
    },
    {
      path: '/article',
      name: '文章管理',
      icon: 'read',
      routes: [
        {
          path: '/article/list',
          exact: true,
          component: 'article/list',
          name: '文章列表',
          icon: 'unorderedList',
          title: '文章列表',
        },
        {
          path: '/article/publish/:id(\\d+)?',
          exact: true,
          component: 'article/publish',
          name: '发布文章',
          icon: 'highlight',
          title: '发布文章',
        },
        { component: '@/pages/404' },
      ],
    },
    {
      path: '/comment',
      exact: true,
      component: 'comment',
      name: '评论管理',
      icon: 'comment',
      title: '评论管理',
    },
    {
      path: '/tags',
      exact: true,
      component: 'tags',
      name: '标签管理',
      icon: 'tag',
      title: '标签管理',
    },
    {
      path: '/files',
      exact: true,
      component: 'files',
      name: '文件管理',
      icon: 'file',
      title: '文件管理',
    },
    {
      path: '/links',
      exact: true,
      component: 'links',
      name: '友链管理',
      icon: 'link',
      title: '友链管理',
    },
    {
      path: '/personal',
      exact: true,
      component: 'personal',
      name: '个人设置',
      icon: 'setting',
      title: '个人设置',
    },
    {
      path: '/monitor',
      name: '监控系统',
      icon: 'fundProjectionScreen',
      routes: [
        {
          path: '/monitor/online_users',
          exact: true,
          component: 'monitor/online_users',
          name: '在线用户',
          icon: 'user',
          title: '在线用户',
        },
        {
          path: '/monitor/tasks',
          exact: true,
          component: 'monitor/tasks',
          name: '定时任务',
          icon: 'clockCircle',
          title: '定时任务',
        },
        {
          path: '/monitor/data',
          exact: true,
          component: 'monitor/data',
          name: '数据监控',
          icon: 'database',
          title: '数据监控',
        },
        {
          path: '/monitor/service',
          exact: true,
          component: 'monitor/service',
          name: '服务监控',
          icon: 'fundView',
          title: '服务监控',
        },
        { component: '@/pages/404' },
      ],
    },
    {
      path: '/system',
      name: '系统管理',
      icon: 'control',
      routes: [
        {
          path: '/system/user',
          exact: true,
          component: 'system/user',
          name: '用户管理',
          icon: 'user',
          title: '用户管理',
        },
        {
          path: '/system/role',
          exact: true,
          component: 'system/role',
          name: '角色管理',
          icon: 'idcard',
          title: '角色管理',
        },
        {
          path: '/system/menu',
          exact: true,
          component: 'system/menu',
          name: '菜单管理',
          icon: 'menu',
          title: '菜单管理',
        },
        {
          path: '/system/param',
          exact: true,
          component: 'system/param',
          name: '参数设置',
          icon: 'tool',
          title: '参数设置',
        },
        {
          path: '/system/notice',
          exact: true,
          component: 'system/notice',
          name: '通知管理',
          icon: 'alert',
          title: '通知管理',
        },
        {
          path: '/system/log',
          name: '日志管理',
          icon: 'schedule',
          routes: [
            {
              path: '/system/log/operate',
              exact: true,
              component: 'system/log/operate',
              name: '操作日志',
              icon: 'snippets',
              title: '操作日志',
            },
            {
              path: '/system/log/login',
              exact: true,
              component: 'system/log/login',
              name: '登录日志',
              icon: 'safety',
              title: '登录日志',
            },
            { component: '@/pages/404' },
          ],
        },
        { component: '@/pages/404' },
      ],
    },
    {
      path: '/500',
      component: '@/pages/500',
      layout: {
        hideMenu: true,
        hideNav: true,
      },
    },
    {
      path: '/403',
      component: '@/pages/403',
      layout: {
        hideMenu: true,
        hideNav: true,
      },
    },
    { component: '@/pages/404' },
  ],
});
