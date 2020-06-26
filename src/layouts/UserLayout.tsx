import React from 'react';
import { DefaultFooter } from '@ant-design/pro-layout';
import { Link } from 'umi';
import styles from './UserLayout.less';
import logo from '@/assets/logo.svg';

export default (props: { userContent: any }) => {
  const userContent = props.userContent;

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.top}>
          <div className={styles.header}>
            <img alt="logo" className={styles.logo} src={logo} />
            <span className={styles.title}>博客</span>
          </div>
          <div className={styles.desc}>博客后台管理系统</div>
        </div>
        {userContent}
      </div>
      <DefaultFooter
        links={[
          { key: 'test', title: 'layout', href: 'www.alipay.com' },
          { key: 'test2', title: 'layout2', href: 'www.alipay.com' },
        ]}
        copyright="这是一条测试文案"
      />
    </div>
  );
};
