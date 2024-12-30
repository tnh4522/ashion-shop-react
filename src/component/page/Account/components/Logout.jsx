import React from 'react';
import { useNavigate } from 'react-router-dom';

function Logout() {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Xử lý đăng xuất (xóa token, session, v.v.)
        // Sau đó chuyển hướng về trang chủ
        navigate('/');
    };

    return (
        <div>
            <h2>Đăng Xuất</h2>
            <button onClick={handleLogout} className="btn btn-primary">Đăng Xuất</button>
        </div>
    );
}

export default Logout;
