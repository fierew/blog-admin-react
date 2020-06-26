import React from 'react';
import styles from './index.css';
import { Table, Space, Popconfirm, Switch, Button } from 'antd';
import { CloseOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons';

export default () => {
  const columns: any[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      ellipsis: true,
    },
    {
      title: '账号',
      dataIndex: 'username',
      key: 'username',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: number, record: { id: number }) => {
        return <a>{status === 1 ? '在线' : '下线'}</a>;
      },
    },
    {
      title: '登录时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 190,
    },
  ];

  const data = [
    {
      id: '1',
      username: 'xy',
      role: 'admin',
      status: 1,
      createTime: '2020-06-01 12:12:12',
    },
  ];
  return (
    <div style={{ padding: 12 }}>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        scroll={{ x: '100%' }}
      />
    </div>
  );
};
