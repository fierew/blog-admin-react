import React from 'react';
import styles from './index.css';
import { Link } from 'umi';
import { Table, Tag, Space, Tooltip, Popconfirm, Switch } from 'antd';
import { CloseOutlined, CheckOutlined } from '@ant-design/icons';

export default () => {
  const onChange = (checked: boolean, id: number) => {
    console.log(checked, id);
  };

  const columns: any[] = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 80,
      ellipsis: true,
    },
    {
      title: '标题',
      dataIndex: 'title',
      key: 'title',
      ellipsis: true,
      width: 150,
      render: (text: string) => {
        return (
          <Tooltip placement="topLeft" title="prompt text">
            <a title={text}>{text}</a>
          </Tooltip>
        );
      },
    },
    {
      title: '标签',
      key: 'tags',
      dataIndex: 'tags',
      width: 200,
      render: (tags: string[]) => (
        <>
          {tags.map(tag => {
            let color = tag.length > 5 ? 'geekblue' : 'green';
            if (tag === 'loser') {
              color = 'volcano';
            }
            return (
              <Tag color={color} key={tag}>
                {tag}
              </Tag>
            );
          })}
        </>
      ), // .toUpperCase() 转大写
    },
    {
      title: '作者',
      dataIndex: 'author',
      key: 'author',
      width: 100,
    },
    {
      title: '状态',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (status: number, record: { id: number }) => {
        return (
          <>
            <Switch
              checkedChildren={<CheckOutlined />}
              unCheckedChildren={<CloseOutlined />}
              defaultChecked={status === 1 ? true : false}
              onChange={(checked: boolean) => {
                onChange(checked, record.id);
              }}
            />
          </>
        );
      },
    },
    {
      title: '赞',
      dataIndex: 'great',
      key: 'great',
      width: 100,
    },
    {
      title: '踩',
      dataIndex: 'tread',
      key: 'tread',
      width: 100,
    },
    {
      title: '评论数',
      dataIndex: 'commentNum',
      key: 'commentNum',
      width: 100,
    },
    {
      title: '创建时间',
      dataIndex: 'createTime',
      key: 'createTime',
      width: 190,
    },
    {
      title: '更新时间',
      dataIndex: 'updateTime',
      key: 'updateTime',
      width: 190,
    },
    {
      title: '操作',
      key: 'operate',
      fixed: 'right',
      width: 110,
      render: (text: any, record: { status: number; id: number }) => {
        const editUrl = `/article/publish/${record.id}`;

        return (
          <Space size="middle">
            <Link to={editUrl}>编辑</Link>
            <Popconfirm title="是否删除文章?">
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
      title: 'docker部署',
      tags: ['docker', 'linux'],
      author: 'xy',
      great: 100,
      tread: 0,
      commentNum: 20,
      createTime: '2020-06-01 12:12:12',
      updateTime: '2020-06-01 12:12:12',
      status: 1,
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
