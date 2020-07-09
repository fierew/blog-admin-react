import React from 'react';
import styles from './index.css';
import { Table, Space, Tooltip, Popconfirm } from 'antd';

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
      title: '文件名称',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      width: 150,
      render: (text: string) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            <a>{text}</a>
          </Tooltip>
        );
      },
    },
    {
      title: '类型',
      dataIndex: 'type',
      key: 'type',
      width: 100,
    },
    {
      title: '大小',
      dataIndex: 'size',
      key: 'size',
      width: 100,
    },
    {
      title: 'SHA',
      dataIndex: 'sha',
      key: 'sha',
      width: 100,
      ellipsis: true,
      render: (text: string) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            <a>{text}</a>
          </Tooltip>
        );
      },
    },
    {
      title: '路径',
      dataIndex: 'path',
      key: 'path',
      width: 100,
      ellipsis: true,
    },
    {
      title: '创建者',
      dataIndex: 'author',
      key: 'author',
      width: 100,
    },
    {
      title: '下载量',
      dataIndex: 'downloadNum',
      key: 'downloadNum',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 190,
    },
    {
      title: '操作',
      key: 'operate',
      fixed: 'right',
      width: 110,
      render: () => {
        return (
          <Space size="middle">
            <a>下载</a>
            <Popconfirm title="是否删除文件?">
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const data = [
    {
      id: '1',
      title: 'docker',
      type: 'exe',
      author: 'xy',
      size: '500MB',
      sha: 'sdkfhkdhkjshdgjkhsghkdjfhgkshdfkghkdjfhgkhsdfkghkdhfgkdf',
      path: '/user/aaa/bbb',
      downloadNum: 100,
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
