import { useEffect, useState } from 'react';
import { Menu, Breadcrumb } from 'antd';
import {UserOutlined, ShoppingCartOutlined, HomeOutlined, LogoutOutlined} from '@ant-design/icons';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';

const MyAccount = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const [selectedKey, setSelectedKey] = useState('info');

    useEffect(() => {
        const path = location.pathname.split('/').pop();
        setSelectedKey(path === 'account' ? 'info' : path);
    }, [location]);

    const handleMenuClick = (e) => {
        setSelectedKey(e.key);
        navigate(`/account/${e.key}`);
    };

    const menuItems = [
        {
            key: 'info',
            icon: <UserOutlined />,
            label: 'Account Information',
        },
        {
            key: 'orders',
            icon: <ShoppingCartOutlined />,
            label: 'Orders',
        },
        {
            key: 'addresses',
            icon: <HomeOutlined />,
            label: 'Addresses',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Logout',
        },
    ];

    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {/* Sidebar Menu */}
            <div style={{ width: 325, padding: '20px', background: '#f0f2f5' }}>
                <Menu
                    onClick={handleMenuClick}
                    selectedKeys={[selectedKey]}
                    mode="inline"
                    items={menuItems}
                    style={{ height: '100%', borderRight: 0 }}
                />
            </div>

            <div style={{ flex: 1, padding: '20px' }}>
                {/* Breadcrumb */}
                <Breadcrumb style={{ marginBottom: '20px' }}>
                    <Breadcrumb.Item>
                        <a href="/">
                            <HomeOutlined /> Home
                        </a>
                    </Breadcrumb.Item>
                    <Breadcrumb.Item>My Account</Breadcrumb.Item>
                </Breadcrumb>
                <Outlet />
            </div>
        </div>
    );
};

export default MyAccount;
