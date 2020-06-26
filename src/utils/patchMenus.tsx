import React from 'react';
import { MenuDataItem } from '@ant-design/pro-layout';
import { SmileOutlined, HeartOutlined } from '@ant-design/icons';

const IconMap: any = {
  smile: <SmileOutlined />,
  heart: <HeartOutlined />,
};

const isURL = (str: string): boolean => {
  var pattern = new RegExp(
    '^(https?:\\/\\/)?' + // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|' + // domain name
    '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
    '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$',
    'i',
  ); // fragment locator
  return pattern.test(str);
};

const loopMenuItem = (menus: MenuDataItem[]): MenuDataItem[] =>
  menus.map(({ icon, path, routes, ...item }: any) => {
    if (!isURL(path)) {
      path = (path ?? '').indexOf(':') === -1 ? path : path.split(':')[0];
    }

    return {
      ...item,
      path: path,
      icon: IconMap[icon as string] ?? icon,
      routes: routes && loopMenuItem(routes),
    };
  });

export { loopMenuItem };
export { IconMap };
