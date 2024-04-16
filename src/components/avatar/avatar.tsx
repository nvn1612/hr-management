import React from 'react'
import {UserOutlined} from '@ant-design/icons';
import {Avatar, Space} from 'antd';

export const AvatarImage: React.FC =() => (
    <Space direction='vertical' size = {16}>
        <Avatar size={64} icon={<UserOutlined/>}></Avatar>
    </Space>
)
 