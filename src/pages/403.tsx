import { Result, Button } from 'antd';
import React from 'react';

export default function() {
    return (
        <Result
            status="403"
            title="403"
            subTitle="抱歉，您无权访问此页。"
            extra={<Button type="primary">返回首页</Button>}
        />
    );
}
