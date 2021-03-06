import React from 'react';
import request from '@/utils/request';
import { UseRequestProvider } from 'ahooks';
import { history, addLocale, getAllLocales } from 'umi';
import { loopMenuItem } from '@/component/patchMenus';
import zhCN from 'antd/es/locale/zh_CN';

export const layout = {
  //iconfontUrl: "/icons/iconfont.js",
  logout: () => {
    history.push('/login');
  }, // do something
  //loading: true,
  patchMenus: (menus: any) => {
    menus = [
      ...menus,
      {
        name: '自定义',
        icon: 'smile',
        path: 'https://bigfish.alipay.com/',
      },
    ];

    return loopMenuItem(menus);
  },
  childrenRender: (children: React.ReactNode) => {
    return (
      <UseRequestProvider
        value={{
          requestMethod: (param: any) => request(param.url, param),
        }}
      >
        {children}
      </UseRequestProvider>
    );
  },
};

export async function getInitialState() {
  return {
    userid: 1,
    name: 'Serati Ma',
    role: 'admin',
  };
}

// 在初始加载和路由切换时做一些事情
export async function onRouteChange({ location, routes, action }: any) {
  const initialState = await getInitialState();
  console.log(initialState);
  // 获取localstorage的用户登录信息
  // const userId = localStorage.getItem("userId")
  // if(location.pathname !== '/login' && !userId){
  //   history.push('/login');
  // }
  // routes[0].routes = [
  //   {
  //     path: '/dashboard',
  //     exact: true,
  //     component: require(`@/pages/files`).default,
  //     name: '仪表盘',
  //     icon: 'dashboard',
  //     title: '仪表盘',
  //   }
  // ]
}

// 项目启动时
export function render(oldRender: () => void) {
  // 向服务端请求路由数据
  // request('http://localhost:8080/routes').then((res) => {
  //   extraRoutes = res.data[0].key;
  //   oldRender()
  // });

  const antdZhCN: any = zhCN;

  // 新增国际化
  addLocale(
    'zh-CN',
    {
      // id 列表
      name: '妳好，{name}',
    },
    {
      momentLocale: 'zh-tw',
      antd: antdZhCN,
    },
  );
  console.log(getAllLocales());

  oldRender();
}
