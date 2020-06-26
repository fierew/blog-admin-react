import React, { useState } from 'react';
import styles from './index.css';
import { Button, Form, Input, Checkbox, Row, Col, Select } from 'antd';
import { UserOutlined, KeyOutlined, LockOutlined } from '@ant-design/icons';
import { Link } from 'umi';
import UserLayout from '@/layouts/UserLayout';

const { Option } = Select;

export default () => {
  const [codeButton, setCodeButton] = useState('获取验证码');
  const mailreg = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  const [form] = Form.useForm();

  // 获取验证码
  const clickCode = () => {
    form.validateFields(['mail']).then((values: any) => {
      form.resetFields(['mail']);
      form.setFieldsValue(values);

      /**
       * 这里写获取验证码的逻辑
       */

      let time = 60;
      setCodeButton(time + ' S');

      const code = window.setInterval(() => {
        time--;
        if (time === 0) {
          setCodeButton('获取验证码');
          window.clearInterval(code);
          return false;
        }

        setCodeButton(time + ' S');
      }, 1000);
    });
  };

  const userContent = (
    <div className={styles.pages_user_login_main}>
      <Form form={form}>
        <Form.Item
          name="mail"
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
          <Input
            size="large"
            prefix={<UserOutlined style={{ color: 'rgb(24, 144, 255)' }} />}
            type="text"
            placeholder="邮箱"
          />
        </Form.Item>
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item
              name="code"
              hasFeedback
              rules={[{ required: true, message: '请输入验证码!' }]}
            >
              <Input
                autoComplete="off"
                size="large"
                prefix={<KeyOutlined style={{ color: 'rgb(24, 144, 255)' }} />}
                placeholder="验证码"
              />
            </Form.Item>
          </Col>
          <Col span={8}>
            <Button
              style={{ width: '100%' }}
              onClick={clickCode}
              size="large"
              disabled={codeButton === '获取验证码' ? false : true}
            >
              {codeButton}
            </Button>
          </Col>
        </Row>
        <Form.Item
          name="username"
          hasFeedback
          rules={[{ required: true, message: '请输入用户名!' }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined style={{ color: 'rgb(24, 144, 255)' }} />}
            type="text"
            placeholder="用户名"
          />
        </Form.Item>
        <Form.Item
          name="sex"
          hasFeedback
          rules={[{ required: true, message: '请选择性别!' }]}
        >
          <Select size="large" placeholder="性别">
            <Option value="">请选择性别</Option>
            <Option value={0}>女</Option>
            <Option value={1}>男</Option>
          </Select>
        </Form.Item>
        <Form.Item
          name="password"
          hasFeedback
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined style={{ color: 'rgb(24, 144, 255)' }} />}
            placeholder="密码"
          />
        </Form.Item>
        <Form.Item
          name="confirm"
          hasFeedback
          rules={[
            { required: true, message: '请输入确认密码!' },
            ({ getFieldValue }) => ({
              validator(rule, value) {
                console.log(12313);
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject('您输入的两个密码不匹配！');
              },
            }),
          ]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined style={{ color: 'rgb(24, 144, 255)' }} />}
            placeholder="确认密码"
          />
        </Form.Item>
        <Form.Item>
          <Row gutter={8}>
            <Col span={12}>
              <Button
                size="large"
                style={{ width: '100%' }}
                type="primary"
                htmlType="submit"
                className={styles.login_form_button}
              >
                注册
              </Button>
            </Col>
            <Col span={12} style={{ textAlign: 'right', lineHeight: 3 }}>
              <Link className={styles.pages_user_login_register} to="/login">
                使用已有账户登录
              </Link>
            </Col>
          </Row>
        </Form.Item>
      </Form>
    </div>
  );

  return <UserLayout userContent={userContent} />;
};
