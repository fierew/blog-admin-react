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
