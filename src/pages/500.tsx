import { Result, Button } from 'antd';
import React from 'react';

export default function() {
    return (
        <Result
            status="500"
            title="500"
            subTitle="对不起，服务器出错了。"
            extra={<Button type="primary">返回首页</Button>}
        />
    );
}
