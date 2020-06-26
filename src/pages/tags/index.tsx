import React, { useState } from 'react';
import styles from './index.css';
import {
  Table,
  Tag,
  Space,
  Popconfirm,
  Button,
  Modal,
  Input,
  Form,
  Row,
  Col,
  Popover,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { SketchPicker, ColorResult, Color } from 'react-color';

export default () => {
  const [form] = Form.useForm();
  const [visible, setVisible] = useState(false);
  const [modelTitle, setModelTitle] = useState('');
  const rbgColor: Color = {
    r: 241,
    g: 112,
    b: 19,
    a: 1,
  };
  const [color, setColor] = useState(rbgColor);

  const onChange = (checked: boolean, id: number) => {
    console.log(checked, id);
  };

  interface Item {
    id: number;
    tag: string;
    author: string;
    color: string;
    createTime: string;
    updateTime: string;
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
      title: '标签',
      key: 'tag',
      dataIndex: 'tag',
      width: 100,
      render: (tag: string, record: { color: string }) => (
        <>
          <Tag color={record.color} key={tag}>
            {tag}
          </Tag>
        </>
      ),
    },
    {
      title: '创建人',
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
      render: (text: any, record: Item) => {
        return (
          <Space size="middle">
            <a
              onClick={() => {
                showModal('编辑标签', record);
              }}
            >
              编辑
            </a>
            <Popconfirm title="是否删除标签?">
              <a style={{ color: 'red' }}>删除</a>
            </Popconfirm>
          </Space>
        );
      },
    },
  ];

  const data: Array<Item> = [
    {
      id: 1,
      tag: 'docker',
      author: 'xy',
      createTime: '2020-06-01 12:12:12',
      updateTime: '2020-06-01 12:12:12',
      color: 'red',
    },
  ];

  // 显示窗口
  const showModal = (title: React.SetStateAction<string>, record: any) => {
    // 重置表单
    form.resetFields();

    // 写入表单数据
    form.setFieldsValue(record);

    if (record.color !== undefined) {
      setColor(record.color);
    }

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

  const onChangeComplete = (color: ColorResult) => {
    setColor(color.rgb);

    const rgba = `rgba(${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`;
    form.setFieldsValue({ color: rgba });
  };

  const onChangeInput = (e: { target: { value: any } }) => {
    console.log(e.target.value);
    setColor(e.target.value);
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
          name="tag"
          label="标签"
          hasFeedback
          rules={[{ required: true, message: '请输入标签!' }]}
        >
          <Input size="large" type="text" />
        </Form.Item>
        <Form.Item>
          <Row gutter={8}>
            <Col span={16}>
              <Form.Item
                name="color"
                label="颜色"
                hasFeedback
                rules={[{ required: true, message: '请选择颜色!' }]}
              >
                <Input size="large" type="text" onChange={onChangeInput} />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Popover
                content={
                  <div style={{ margin: '-12px -16px' }}>
                    <SketchPicker color={color} onChange={onChangeComplete} />
                  </div>
                }
                trigger="click"
                placement="right"
              >
                <Button
                  className={styles.page_model_right_button}
                  type="primary"
                  size="large"
                >
                  选择颜色
                </Button>
              </Popover>
            </Col>
          </Row>
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
            showModal('添加标签', {});
          }}
        >
          添加标签
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
