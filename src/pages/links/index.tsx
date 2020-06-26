import React, { useState } from 'react';
import styles from './index.css';
import {
  Table,
  Space,
  Tooltip,
  Popconfirm,
  Button,
  Modal,
  Form,
  Input,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [modelTitle, setModelTitle] = useState('');

  interface Item {
    id: number;
    title: string;
    author: string;
    link: string;
    createTime: string;
  }

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
      render: (text: string, record: { link: string | undefined }) => {
        return (
          <Tooltip placement="topLeft" title={text}>
            <a>{text}</a>
          </Tooltip>
        );
      },
    },
    {
      title: '链接',
      dataIndex: 'link',
      key: 'link',
      width: 150,
      render: (link: string, record: { link: string | undefined }) => {
        return (
          <Tooltip placement="topLeft" title={link}>
            <a href={record.link}>{link}</a>
          </Tooltip>
        );
      },
    },
    {
      title: '创建者',
      dataIndex: 'author',
      key: 'author',
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
      render: (_: any, record: Item) => {
        return (
          <Space size="middle">
            <a
              onClick={() => {
                showModal('编辑友链', record);
              }}
            >
              编辑
            </a>
            <Popconfirm title="是否删除友链?">
              <a>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const data: Array<Item> = [
    {
      id: 1,
      title: 'baidu',
      author: 'xy',
      link: 'http://www.baidu.com',
      createTime: '2020-06-01 12:12:12',
    },
  ];

  // 显示窗口
  const showModal = (
    title: React.SetStateAction<string>,
    record: Item | object,
  ) => {
    // 重置表单
    form.resetFields();

    // 写入表单数据
    form.setFieldsValue(record);

    // 设置窗口标题
    setModelTitle(title);

    // 显示窗口
    setVisible(true);
  };

  const handleOk = (e: any) => {
    setVisible(false);
  };

  const handleCancel = (e: any) => {
    setVisible(false);
  };

  const model = (
    <Modal
      title={modelTitle}
      visible={visible}
      onOk={handleOk}
      onCancel={handleCancel}
    >
      <Form form={form}>
        <Form.Item
          name="title"
          label="标题"
          hasFeedback
          rules={[{ required: true, message: '请输入标题!' }]}
        >
          <Input size="large" type="text" />
        </Form.Item>
        <Form.Item
          name="link"
          label="链接"
          hasFeedback
          rules={[{ required: true, message: '请输入链接!' }]}
        >
          <Input size="large" type="text" />
        </Form.Item>
      </Form>
    </Modal>
  );

  return (
    <div style={{ padding: 12 }}>
      <div style={{ marginBottom: 16 }}>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => {
            showModal('添加友链', {});
          }}
        >
          添加友链
        </Button>
        {model}
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
