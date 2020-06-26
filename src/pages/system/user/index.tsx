import React from 'react';
import styles from './index.css';
import { Table, Space, Popconfirm, Switch, Button } from 'antd';
import { CloseOutlined, CheckOutlined, PlusOutlined } from '@ant-design/icons';

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
      title: '账号',
      dataIndex: 'username',
      key: 'username',
      width: 100,
    },
    {
      title: '角色',
      dataIndex: 'role',
      key: 'role',
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
            <a>编辑</a>
            <Popconfirm title="是否删除友链?">
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      },
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
      <div style={{ marginBottom: 16 }}>
        <Button type="primary" icon={<PlusOutlined />}>
          添加用户
        </Button>
      </div>
      <Table
        rowKey="id"
        dataSource={data}
        columns={columns}
        scroll={{ x: '100%' }}
      />
    </div>
  );
};
