import React from 'react';
import styles from './index.css';
import { Avatar, Button, Form, Input } from 'antd';
import { UserOutlined, UploadOutlined } from '@ant-design/icons';

export default () => {
  const mailreg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const [form] = Form.useForm();

  return (
    <div>
      <div style={{ textAlign: 'center', padding: '20px 0 10px 0' }}>
        <Avatar size={128} icon={<UserOutlined />} />
      </div>
      <div style={{ textAlign: 'center' }}>
        <Button icon={<UploadOutlined />}>更换头像</Button>
      </div>
      <div className={styles.pages_user_personal_setting_input}>
        <Form
          layout="vertical"
          initialValues={{
            mail: 'xuyang@163.com',
            nickname: '哈哈哈',
            synopsis: '我是练习时长两年半的个人实习生',
          }}
        >
          <Form.Item
            name="mail"
            label="邮箱"
            hasFeedback
            rules={[
              { required: true, message: '请输入邮箱!' },
              ({ getFieldValue }) => ({
                validator(rule, value) {
                  if (!value || mailreg.test(value)) {
                    return Promise.resolve();
                  }
                  return Promise.reject('你输入的邮箱格式不正确，请重新输入!');
                },
              }),
            ]}
          >
            <Input size="large" type="text" placeholder="邮箱" />
          </Form.Item>
          <Form.Item
            name="nickname"
            label="昵称"
            hasFeedback
            rules={[{ required: true, message: '请输入昵称!' }]}
          >
            <Input size="large" type="text" placeholder="昵称" />
          </Form.Item>
          <Form.Item name="synopsis" label="个人简介" hasFeedback>
            <Input.TextArea style={{ height: 100 }} placeholder="个人简介" />
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};
