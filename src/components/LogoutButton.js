import React, { useContext } from 'react';
import { NotificationManager } from 'react-notifications';
import { UserContext } from '../contexts/UserContext';

const LogoutButton = () => {
    const { setIsLogin } = useContext(UserContext);
    const logoutHandler = (e) => {
        e.preventDefault();
        localStorage.removeItem('token');
        setIsLogin(false);
        NotificationManager.success('Đã đăng xuất!', 'Logout!');
    };

    return (<button onClick={logoutHandler}>Logout</button>);
}

export default LogoutButton;