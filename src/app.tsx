import React from 'react';
import request from '@/utils/request';
import { UseRequestProvider } from 'ahooks';
import { history } from 'umi';
import { loopMenuItem } from '@/utils/patchMenus';

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
          requestMethod: param => request(param.url, param),
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

// let extraRoutes: any; // 服务端返回路由
// export function patchRoutes({ routes }: any) {

//   // 修改默认路由 直接 routes，不需要返回
//   routes[0].routes = [
//     {
//       path: '/dashboard',
//       exact: true,
//       component: require(`@/pages/${extraRoutes}`).default,
//       name: '仪表盘',
//       icon: 'dashboard',
//       title: '仪表盘',
//     }
//   ]
// }

// // 项目启动时
// export function render(oldRender: () => void) {

//   // 向服务端请求路由数据
//   request('http://localhost:8080/routes').then((res) => {
//     extraRoutes = res.data[0].key;
//     oldRender()
//   });
// }
