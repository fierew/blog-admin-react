import React from 'react';
import styles from './index.css';
import { Link } from 'umi';
import { Button, Form, Input, Checkbox, Row, Col } from 'antd';
import {
  UserOutlined,
  KeyOutlined,
  LockOutlined,
  WechatOutlined,
  QqOutlined,
} from '@ant-design/icons';
import UserLayout from '@/layouts/UserLayout';

export default () => {
  const userContent = (
    <div className={styles.pages_user_login_main}>
      <Form>
        <Form.Item
          name="username"
          rules={[{ required: true, message: '请输入你的用户名或邮箱!' }]}
        >
          <Input
            size="large"
            prefix={<UserOutlined style={{ color: 'rgb(24, 144, 255)' }} />}
            placeholder="用户名/邮箱"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: '请输入密码!' }]}
        >
          <Input.Password
            size="large"
            prefix={<LockOutlined style={{ color: 'rgb(24, 144, 255)' }} />}
            placeholder="密码"
          />
        </Form.Item>
        <Row gutter={8}>
          <Col span={16}>
            <Form.Item
              name="code"
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
            <img style={{ height: '40px', width: '100%' }} alt="code" src="" />
          </Col>
        </Row>
        <Form.Item>
          <Checkbox>记住密码</Checkbox>
          <Link className={styles.pages_user_login_register} to="">
            忘记密码
          </Link>
          <Button
            loading={false}
            size="large"
            type="primary"
            htmlType="submit"
            className={styles.login_form_button}
          >
            登录
          </Button>
        </Form.Item>
      </Form>
      <div className={styles.pages_user_login_other}>
        <span>其他登陆方式</span>
        <WechatOutlined className={styles.pages_user_login_icon} />
        <QqOutlined className={styles.pages_user_login_icon} />
        <Link className={styles.pages_user_login_register} to="/register">
          注册账户
        </Link>
      </div>
    </div>
  );

  return <UserLayout userContent={userContent} />;
};
